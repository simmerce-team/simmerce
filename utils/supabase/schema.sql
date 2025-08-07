-- Enable necessary extensions
create extension if not exists "uuid-ossp" with schema public;

-- 0. Countries Table
create table if not exists public.countries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  iso_code text,
  phone_code text,
  currency text,
  currency_symbol text,
  status text default 'active',
  slug text not null unique,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint uq_country_name unique (name)
);

-- 1. States Table
create table if not exists public.states (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  country_id uuid not null references public.countries(id) on delete cascade,
  slug text not null unique,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint uq_state_name_country unique (name, country_id)
);

-- 2. Cities Table
create table if not exists public.cities (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  state_id uuid references public.states(id) on delete set null,
  country_id uuid references public.countries(id) on delete set null,
  slug text not null unique,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint uq_city_state_country unique (name, state_id, country_id)
);

-- Create a view for cities with state and country information
create or replace view public.cities_with_location as
select 
  c.id,
  c.name as city_name,
  s.name as state_name,
  s.id as state_id,
  co.name as country_name,
  co.id as country_id,
  c.created_at,
  c.updated_at
from 
  public.cities c
  left join public.states s on c.state_id = s.id
  left join public.countries co on s.country_id = co.id or c.country_id = co.id;

-- 3. Users Table
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  created_at timestamp with time zone default now()
);

-- 7. Business Types Table
create table business_types (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamp with time zone default now()
);

-- Function to generate slug from text
create or replace function public.slugify(text_value text)
returns text
language plpgsql
immutable
as $$
begin
  -- Convert to lowercase, replace spaces with hyphens, remove special characters
  return regexp_replace(
    lower(trim(text_value)),
    '[^\w\s-]',
    '',
    'g'
  );
end;
$$;

-- Function to generate a unique slug by appending a number if needed
create or replace function public.generate_unique_slug(p_table text, p_text text, p_exclude_id uuid DEFAULT NULL)
returns text
language plpgsql
as $$
declare
    base_slug text;
    slug text;
    counter integer := 1;
    exists boolean;
begin
    -- Generate base slug
    base_slug := public.slugify(p_text);
    slug := base_slug;
    
    -- Check if slug exists in the specified table
    execute format('SELECT EXISTS(SELECT 1 FROM %I WHERE slug = $1 AND ($2::uuid IS NULL OR id != $2))', p_table)
    into exists
    using slug, p_exclude_id;
    
    -- If slug exists, append a number and try again
    while exists loop
        slug := base_slug || '-' || counter;
        counter := counter + 1;
        
        execute format('SELECT EXISTS(SELECT 1 FROM %I WHERE slug = $1 AND ($2::uuid IS NULL OR id != $2))', p_table)
        into exists
        using slug, p_exclude_id;
    end loop;
    
    return slug;
end;
$$;

-- Create triggers to automatically set slugs on insert and update
-- For countries
create or replace function public.set_country_slug()
returns trigger
language plpgsql
as $$
begin
    if new.slug is null or new.slug = '' or (tg_op = 'update' and old.name != new.name) then
        new.slug := public.generate_unique_slug('countries', new.name, new.id);
    end if;
    return new;
end;
$$;

create trigger set_country_slug_trigger
before insert or update of name on public.countries
for each row
execute function public.set_country_slug();

-- For states
create or replace function public.set_state_slug()
returns trigger
language plpgsql
as $$
begin
    if new.slug is null or new.slug = '' or (tg_op = 'update' and old.name != new.name) then
        new.slug := public.generate_unique_slug('states', new.name, new.id);
    end if;
    return new;
end;
$$;

create trigger set_state_slug_trigger
before insert or update of name on public.states
for each row
execute function public.set_state_slug();

-- For cities
create or replace function public.set_city_slug()
returns trigger
language plpgsql
as $$
begin
    if new.slug is null or new.slug = '' or (tg_op = 'update' and old.name != new.name) then
        new.slug := public.generate_unique_slug('cities', new.name, new.id);
    end if;
    return new;
end;
$$;

create trigger set_city_slug_trigger
before insert or update of name on public.cities
for each row
execute function public.set_city_slug();

-- For business_types
create or replace function public.set_business_type_slug()
returns trigger
language plpgsql
as $$
begin
    if new.slug is null or new.slug = '' or (tg_op = 'update' and old.name != new.name) then
        new.slug := public.generate_unique_slug('business_types', new.name, new.id);
    end if;
    return new;
end;
$$;

create trigger set_business_type_slug_trigger
before insert or update of name on public.business_types
for each row
execute function public.set_business_type_slug();

-- 4. Businesses Table
create table businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  description text,
  logo_url text,
  gst_number text,
  address text,
  pincode text,
  city_id uuid references cities(id) on delete set null,
  business_type_id uuid references business_types(id) on delete set null,
  is_verified boolean default false,
  created_at timestamp with time zone default now(),
  constraint uq_business_slug unique (slug)
);

-- Function to update slugs on insert/update for businesses
create or replace function public.update_business_slug()
returns trigger
language plpgsql
as $$
begin
  new.slug := public.slugify(new.name);
  return new;
end;
$$;

-- Create triggers for automatic slug updates
create trigger set_business_slug
before insert or update of name on businesses
for each row
execute function public.update_business_slug();

-- 8. User Business Mapping
create table if not exists user_businesses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  business_id uuid not null references businesses(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner', 'admin', 'manager', 'staff')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint unique_user_business unique (user_id, business_id)
);

-- 9. Categories Table (self-referential)
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  description text,
  icon_url text,
  parent_id uuid references categories(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint uq_category_slug unique (slug)
);

-- Function to update slugs on insert/update for categories
create or replace function public.update_category_slug()
returns trigger
language plpgsql
as $$
begin
  new.slug := public.slugify(new.name);
  return new;
end;
$$;

-- Create triggers for automatic slug updates
create trigger set_category_slug
before insert or update of name on categories
for each row
execute function public.update_category_slug();

-- 10. Products Table
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  slug text not null,
  description jsonb,
  category_id uuid references categories(id) on delete set null,
  price numeric(10,2) not null check (price >= 0),
  unit text not null,
  moq int not null default 1 check (moq > 0),
  stock_quantity int default 0 check (stock_quantity >= 0),
  sku text,
  is_active boolean default true,
  view_count int default 0,
  enquiry_count int default 0,
  pdf_url text,
  youtube_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint uq_product_business_slug unique (business_id, slug)
);

-- Function to update slugs on insert/update for products
create or replace function public.update_product_slug()
returns trigger
language plpgsql
as $$
begin
  new.slug := public.slugify(new.name);
  return new;
end;
$$;

-- Create triggers for automatic slug updates
create trigger set_product_slug
before insert or update of name on products
for each row
execute function public.update_product_slug();

-- 11. Product Files
create table if not exists product_files (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  file_type text not null,
  alt_text text,
  display_order int default 0,
  is_primary boolean default false,
  created_at timestamp with time zone default now()
);

-- 12. Enquiries
create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  business_id uuid not null references businesses(id) on delete cascade,
  message text,
  status text default 'pending',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 13. Buy Leads
create table if not exists buy_leads (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  title text not null,
  description text,
  category_id uuid references categories(id) on delete set null,
  quantity int,
  unit text,
  target_price numeric(10,2),
  status text not null default 'open' check (status in ('open', 'in_negotiation', 'closed')),
  created_by uuid references users(id) on delete set null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 14. User Search History
create table if not exists user_search_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  search_query text not null,
  filters jsonb,
  result_count int,
  created_at timestamp with time zone default now()
);

-- 15. Product Views (for detailed analytics)
create table if not exists product_views (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  business_id uuid references businesses(id) on delete set null,
  ip_address inet,
  user_agent text,
  referrer text,
  session_id text,
  created_at timestamp with time zone default now()
);

-- 16. User Interactions (tracks all user actions)
create table if not exists user_interactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  business_id uuid references businesses(id) on delete set null,
  product_id uuid references products(id) on delete set null,
  interaction_type text not null check (interaction_type in (
    'view', 'enquiry', 'wishlist', 'share', 'download', 'video_play'
  )),
  metadata jsonb,
  created_at timestamp with time zone default now()
);

-- Function to set business_id when a new interaction is inserted
create or replace function set_interaction_business_id()
returns trigger
language plpgsql
as $$
begin
  if new.product_id is not null then
    select p.business_id into new.business_id
    from products p
    where p.id = new.product_id;
  end if;
  
  return new;
end;
$$;

-- Trigger to set business_id before insert
create trigger set_interaction_business
before insert on user_interactions
for each row
when (new.business_id is null and new.product_id is not null)
execute function set_interaction_business_id();

-- 17. Seller Analytics (materialized view for performance)
create materialized view if not exists seller_analytics as
with product_stats as (
  select
    p.business_id,
    count(distinct p.id) as total_products,
    count(distinct case when p.is_active then p.id end) as active_products,
    count(distinct v.id) as total_views,
    count(distinct e.id) as total_enquiries,
    count(distinct v.user_id) as unique_visitors,
    max(v.created_at) as last_viewed_at
  from products p
  left join product_views v on v.product_id = p.id
  left join enquiries e on e.product_id = p.id
  group by p.business_id
),
business_stats as (
  select
    b.id as business_id,
    count(distinct ub.user_id) as team_members,
    b.created_at as business_since
  from businesses b
  left join user_businesses ub on ub.business_id = b.id
  group by b.id
)
select
  b.*,
  coalesce(p.total_products, 0) as total_products,
  coalesce(p.active_products, 0) as active_products,
  coalesce(p.total_views, 0) as total_views,
  coalesce(p.total_enquiries, 0) as total_enquiries,
  coalesce(p.unique_visitors, 0) as unique_visitors,
  coalesce(bs.team_members, 0) as team_members,
  bs.business_since,
  p.last_viewed_at,
  current_timestamp as last_updated_at
from businesses b
left join product_stats p on p.business_id = b.id
left join business_stats bs on bs.business_id = b.id;

-- 18. Indexes for performance
create index if not exists idx_products_business_id on products(business_id);
create index if not exists idx_products_category_id on products(category_id);
create index if not exists idx_products_slug on products(slug);
create index if not exists idx_products_is_active on products(is_active);
create index if not exists idx_product_files_product_id on product_files(product_id);
create index if not exists idx_enquiries_business_id on enquiries(business_id);
create index if not exists idx_buy_leads_business_id on buy_leads(business_id);
create index if not exists idx_product_views_product_id on product_views(product_id);
create index if not exists idx_product_views_created_at on product_views(created_at);
create index if not exists idx_product_views_user_id on product_views(user_id) where user_id is not null;
create index if not exists idx_product_views_business_id on product_views(business_id);
create index if not exists idx_user_search_history_user_id on user_search_history(user_id);
create index if not exists idx_user_search_history_created_at on user_search_history(created_at);
create index if not exists idx_user_interactions_composite on user_interactions(user_id, interaction_type, created_at);
create index if not exists idx_user_interactions_business on user_interactions(business_id, interaction_type, created_at);

-- 19. Functions and Triggers
-- Function to refresh materialized view
create or replace function refresh_seller_analytics()
returns trigger
language plpgsql
as $$
begin
  refresh materialized view concurrently seller_analytics;
  return null;
end;
$$;

-- 20. Triggers to update materialized view
create trigger refresh_seller_analytics_trigger
after insert or update or delete or truncate
on product_views
execute function refresh_seller_analytics();

create trigger refresh_seller_analytics_trigger2
after insert or update or delete or truncate
on enquiries
execute function refresh_seller_analytics();

-- 21. Function to track search history
create or replace function track_search(
  p_user_id uuid,
  p_search_query text,
  p_filters jsonb default null,
  p_result_count int default null
)
returns void
language plpgsql
as $$
begin
  insert into user_search_history (user_id, search_query, filters, result_count)
  values (p_user_id, p_search_query, p_filters, p_result_count);
end;
$$;

-- 22. Function to track product view
create or replace function track_product_view(
  p_product_id uuid,
  p_user_id uuid,
  p_business_id uuid,
  p_ip_address inet default null,
  p_user_agent text default null,
  p_referrer text default null,
  p_session_id text default null
)
returns void
language plpgsql
as $$
begin
  insert into product_views (
    product_id, user_id, business_id, ip_address, user_agent, referrer, session_id
  ) values (
    p_product_id, p_user_id, p_business_id, p_ip_address, p_user_agent, p_referrer, p_session_id
  );
  
  -- Update view count in products table
  update products 
  set view_count = view_count + 1 
  where id = p_product_id;
end;
$$;

-- 23. Function to record user interaction
create or replace function record_interaction(
  p_user_id uuid,
  p_interaction_type text,
  p_business_id uuid default null,
  p_product_id uuid default null,
  p_metadata jsonb default null
)
returns void
language plpgsql
as $$
begin
  insert into user_interactions (
    user_id, business_id, product_id, interaction_type, metadata
  ) values (
    p_user_id, p_business_id, p_product_id, p_interaction_type, p_metadata
  );
  
  -- Update relevant counters based on interaction type
  case p_interaction_type
    when 'enquiry' then
      update products 
      set enquiry_count = enquiry_count + 1 
      where id = p_product_id;
    -- Add more cases as needed
  end case;
end;
$$;

-- 24. Function to get business metrics for dashboard
create or replace function public.get_business_metrics(p_business_id uuid)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_metrics jsonb;
  v_total_products int;
  v_active_enquiries int;
  v_open_buy_leads int;
  v_conversion_rate numeric(10,2);
  v_total_views int;
  v_total_enquiries int;
begin
  -- Get total products
  select count(*) into v_total_products
  from products
  where business_id = p_business_id
  and is_active = true;

  -- Get active enquiries
  select count(*) into v_active_enquiries
  from enquiries
  where business_id = p_business_id
  and status in ('new', 'contacted', 'quoted');

  -- Get open buy leads
  select count(*) into v_open_buy_leads
  from buy_leads
  where business_id = p_business_id
  and status = 'open';

  -- Calculate conversion rate (enquiries / views)
  select 
    count(distinct e.id) as enquiries,
    count(distinct pv.id) as views
  into v_total_enquiries, v_total_views
  from products p
  left join product_views pv on pv.product_id = p.id
  left join enquiries e on e.product_id = p.id
  where p.business_id = p_business_id;

  if v_total_views > 0 then
    v_conversion_rate := (v_total_enquiries::numeric / v_total_views) * 100;
  else
    v_conversion_rate := 0;
  end if;

  -- Build the result
  v_metrics := jsonb_build_object(
    'total_products', v_total_products,
    'active_enquiries', v_active_enquiries,
    'open_buy_leads', v_open_buy_leads,
    'conversion_rate', round(v_conversion_rate, 2),
    'last_updated', now()
  );

  return v_metrics;
end;
$$;

-- Function to get product with primary image
create or replace function public.get_product_with_primary_image(p_product_id uuid)
returns jsonb
language sql
as $$
  select jsonb_build_object(
    'product', to_jsonb(p.*),
    'primary_image', (
      select to_jsonb(pf.*)
      from product_files pf
      where pf.product_id = p.id
      and pf.is_primary = true
      limit 1
    )
  )
  from products p
  where p.id = p_product_id;
$$;

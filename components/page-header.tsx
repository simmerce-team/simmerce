type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="hidden md:block bg-gradient-to-b from-slate-50/50 to-white border-b border-slate-200/60">
      <div className="container mx-auto px-6 pb-12 max-w-7xl">
        <div className="text-center">
          <h1 className="text-xl md:text-4xl font-medium text-slate-800 tracking-tight mb-4">{title}</h1>
          {description && (
            <p className="text-sm md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

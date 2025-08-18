import { Check } from 'lucide-react';
import Link from 'next/link';

type Plan = {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

export default function PricingPage() {
  const plans: Plan[] = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started with basic features',
      features: [
        'Up to 5 products',
        'Basic analytics',
        'Email support',
        'Mobile-friendly dashboard',
      ],
      cta: 'Get started for free',
    },
    {
      name: 'Starter',
      price: 999,
      period: 'month',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 50 products',
        'Advanced analytics',
        'Priority Leads',
        'Priority email support',
        'Custom domain',
      ],
      cta: 'Start free trial',
      popular: true,
    },
    {
      name: 'Pro',
      price: 2499,
      period: 'month',
      description: 'For businesses with advanced needs',
      features: [
        'Unlimited products',
        'Advanced analytics & reports',
        '24/7 priority support',
        'Priority Leads',
        'Custom domain',
        'Team members',
        'Custom integrations',
      ],
      cta: 'Start free trial',
    },
  ];

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Choose the perfect plan for your business needs. Start with our free plan and upgrade anytime.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-3xl p-8 ring-1 ring-gray-200 dark:ring-gray-700 ${
                plan.popular ? 'ring-2 ring-indigo-600 dark:ring-indigo-400' : ''
              }`}
            >
              {plan.popular && (
                <p className="w-fit rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-400">
                  Most popular
                </p>
              )}
              <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {plan.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-2">
                <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  ₹{plan.price}
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">
                  {plan.price === 0 ? 'forever' : `/month`}
                </span>
              </p>
              
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link
                href={process.env.NEXT_PUBLIC_SELLER_URL || "/seller/register"}
                className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-offset-2 ${
                  plan.popular
                    ? 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'
                    : 'bg-gray-900 hover:bg-gray-800 focus-visible:outline-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 dark:focus-visible:outline-white'
                }`}
              >
                {plan.cta}
              </Link>
              
              {plan.price === 0 && (
                <p className="mt-4 text-xs leading-5 text-gray-600 dark:text-gray-400">
                  No credit card required
                </p>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Questions?{' '}
            <a href="mailto:support@simmerce.com" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
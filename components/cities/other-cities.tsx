import { fetchCityWithBusinessCount } from "@/actions/cities";
import Link from "next/link";

export async function OtherCitiesList() {
  const cities = await fetchCityWithBusinessCount({ limit: 6 });

  if (cities.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {cities.map((city) => {
        const citySlug = city.name.toLowerCase().replace(/\s+/g, "-");
        return (
          <Link
            key={city.id}
            href={`/cities/${citySlug}`}
            className="group block p-6 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-slate-800 group-hover:text-primary transition-colors">
                  {city.name}
                </h3>
                <p className="text-xs md:text-sm text-slate-500 mt-1">
                  {city.businessCount ? `${city.businessCount} Businesses` : "No Businesses"}
                </p>
              </div>
              <span className="text-slate-400 group-hover:text-primary transition-colors">
                →
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
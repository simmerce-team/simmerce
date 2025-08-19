import { fetchCategories } from "@/actions/categories";
import { Images } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await fetchCategories();

  return (
    <div className="container mx-auto px-3 md:py-8 max-w-7xl">
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.name
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
            className="group flex flex-col items-center p-3 sm:p-4 md:p-5 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-200 active:scale-[0.98] active:bg-slate-50"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-3 sm:mb-4 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-red-50 transition-colors">
              <Image
                src={category.icon_url || Images.placeholder}
                alt={category.name}
                width={40}
                height={40}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-slate-400 object-contain"
              />
            </div>
            <h3 className="text-sm sm:text-base md:text-lg text-center mb-1 line-clamp-2">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

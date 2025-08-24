import { fetchCategories } from "@/actions/categories";
import { Images } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";

export async function RelatedCategories({ currentSlug }: { currentSlug: string }) {
  const categories = await fetchCategories();

  const related = categories
    .filter((cat) => cat.name.toLowerCase().replace(/\s+/g, "-") !== currentSlug)
    .slice(0, 6);

  if (related.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
      {related.map((relatedCategory) => {
        const categorySlug = relatedCategory.name.toLowerCase().replace(/\s+/g, "-");
        return (
          <Link
            key={relatedCategory.id}
            href={`/categories/${categorySlug}`}
            className="group flex flex-col items-center p-5 hover:bg-slate-50/50 rounded-xl transition-all duration-200 border border-slate-100 hover:border-slate-200"
          >
            <div className="w-12 h-12 mb-3 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-accent transition-colors">
              <Image
                src={relatedCategory.icon_url || Images.placeholder}
                alt={relatedCategory.name}
                width={24}
                height={24}
                className="text-slate-400"
              />
            </div>
            <span className="text-sm font-medium text-slate-700 text-center group-hover:text-primary transition-colors">
              {relatedCategory.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
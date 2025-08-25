import { fetchCategories } from "@/actions/categories";
import { Images } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";

export async function RelatedCategories({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const categories = await fetchCategories();

  const related = categories
    .filter(
      (cat) => cat.name.toLowerCase().replace(/\s+/g, "-") !== currentSlug
    )
    .slice(0, 6);

  if (related.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
      {related.map((relatedCategory) => {
        return (
          <Link
            key={relatedCategory.id}
            href={`/categories/${relatedCategory.slug}`}
            className="group flex flex-col items-center p-5 hover:bg-slate-50/50 rounded-xl transition-all duration-200 border border-slate-100 hover:border-slate-200"
          >
            <Image
              src={Images.placeholder}
              alt={relatedCategory.name}
              width={48}
              height={48}
              className="rounded-lg"
            />
            <span className="mt-2 text-sm font-medium text-slate-700 text-center group-hover:text-primary transition-colors">
              {relatedCategory.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

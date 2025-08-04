"use client";

import { Category, fetchHomeCategories } from "@/actions/categories";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CategoryCardProps {
  category: Category
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.name.toLowerCase().replace(' ', '-')}`}
      className="group flex flex-col items-center p-6 bg-white hover:bg-slate-50/50 rounded-xl transition-all duration-200 border border-slate-100 hover:border-slate-200"
    >
      <div className="w-14 h-14 mb-4 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-accent transition-colors">
        {category.icon_url ? (
          <Image
            src={category.icon_url}
            alt={category.name}
            width={48}
            height={48}
            className="rounded-xl"
          />
        ) : (
          <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center">
            <span className="text-2xl">📦</span>
          </div>
        )}
      </div>
      <span className="text-sm font-medium text-slate-700 text-center group-hover:text-accent transition-colors">
        {category.name}
      </span>
    </Link>
  );
}

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchHomeCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="h-[calc(100vh-12rem)] py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-medium text-slate-800 mb-3">
          Explore Categories
        </h1>
        <p className="text-slate-600 text-lg">
          Discover products across various industries
        </p>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-40 bg-slate-100 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.slice(0, 10).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}

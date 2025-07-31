"use client";

import { Categories, fetchCategories } from "@/actions/categories";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Images } from "@/utils/constant";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";

export function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleMenuChange = (value: SetStateAction<string>) => {
    setActiveMenu(value);
    setIsOpen(value !== "");
  };

  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    loadCategories();
  }, []);

console.log(categories);

  return (
    <div className="hidden lg:flex">
      <NavigationMenu value={activeMenu} onValueChange={handleMenuChange}>
        <NavigationMenuList className="gap-1">
          {/* Categories Mega Menu */}
          <NavigationMenuItem value="categories">
            <NavigationMenuTrigger className="h-10 px-4 py-2 text-sm font-medium text-slate-700 hover:text-red-600 hover:bg-red-50/50 data-[active]:bg-red-50 data-[state=open]:bg-red-50 transition-colors">
              All Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent className="!w-[600px]">
              <div className="max-h-[500px] overflow-y-auto p-6">
                <div className="grid grid-cols-2 gap-6">
                    {categories.map((category) => (
                      <div key={category.id} className="space-y-3">
                        <Link
                          href={`/categories/${category.name
                            .toLowerCase()
                            .replace(" ", "-")}`}
                          onClick={handleLinkClick}
                          className="group flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                            <img
                              src={category.icon_url || Images.placeholder}
                              alt={category.name}
                              className="w-6 h-6"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-900 group-hover:text-red-600 transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-xs text-slate-500">
                              {category?.subcategories?.length || 0}{" "}
                              subcategories
                            </p>
                          </div>
                        </Link>

                        {/* Subcategories */}
                        <div className="ml-4 space-y-1">
                          {category.subcategories?.slice(0, 4).map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/categories/${sub.name.toLowerCase().replace(" ", "-")}`}
                              onClick={handleLinkClick}
                              className="flex items-center justify-between text-sm text-slate-600 hover:text-red-600 hover:bg-red-50/50 px-2 py-1 rounded transition-colors group"
                            >
                              <span>{sub.name}</span>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {/* <span className="text-xs text-slate-400">
                                  {0}
                                </span> */}
                                <ChevronRight className="w-3 h-3" />
                              </div>
                            </Link>
                          ))}
                          {(category.subcategories?.length || 0) > 4 && (
                            <Link
                              href={`/categories/${category.name}`}
                              onClick={handleLinkClick}
                              className="text-xs text-red-600 hover:text-red-700 px-2 py-1 block"
                            >
                              View all {category.subcategories?.length}{" "}
                              subcategories →
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Suppliers Menu */}
          {/* <NavigationMenuItem value="suppliers">
            <NavigationMenuTrigger className="h-10 px-4 py-2 text-sm font-medium text-slate-700 hover:text-red-600 hover:bg-red-50/50 data-[active]:bg-red-50 data-[state=open]:bg-red-50 transition-colors">
              Suppliers
            </NavigationMenuTrigger>
            <NavigationMenuContent className="!w-[400px]">
              <div className="max-h-[400px] overflow-y-auto p-6">
                <div className="grid grid-cols-1 gap-4">
                  <Link
                    href="/sellers?filter=verified"
                    onClick={handleLinkClick}
                    className="group flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      <Shield className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 group-hover:text-red-600 transition-colors">
                        Verified Suppliers
                      </h3>
                      <p className="text-sm text-slate-600">
                        {platformStats.verifiedSuppliers.toLocaleString()}+ trusted business partners
                      </p>
                    </div>
                  </Link>
                  
                  <Link
                    href="/sellers?filter=top-rated"
                    onClick={handleLinkClick}
                    className="group flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                      <TrendingUp className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 group-hover:text-red-600 transition-colors">
                        Top Rated Suppliers
                      </h3>
                      <p className="text-sm text-slate-600">
                        Highest customer satisfaction ratings
                      </p>
                    </div>
                  </Link>
                  
                  <Link
                    href="/sellers?filter=exporters"
                    onClick={handleLinkClick}
                    className="group flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 group-hover:text-red-600 transition-colors">
                        Export Ready Suppliers
                      </h3>
                      <p className="text-sm text-slate-600">
                        International trade certified suppliers
                      </p>
                    </div>
                  </Link>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Button 
                    asChild
                    variant="outline" 
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                    onClick={handleLinkClick}
                  >
                    <Link href="/sellers">
                      Browse All Suppliers
                    </Link>
                  </Button>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem> */}

          {/* Quick Links */}
          {/* <NavigationMenuItem>
            <NavigationMenuLink
              href="/products"
              onClick={handleLinkClick}
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-red-50/50 hover:text-red-600 focus:bg-red-50 focus:text-red-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-red-50/50 data-[state=open]:bg-red-50/50",
                "text-slate-700"
              )}
            >
              Products
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="/cities"
              onClick={handleLinkClick}
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-red-50/50 hover:text-red-600 focus:bg-red-50 focus:text-red-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-red-50/50 data-[state=open]:bg-red-50/50",
                "text-slate-700"
              )}
            >
              Cities
            </NavigationMenuLink>
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { categories, platformStats, popularSearches } from "@/lib/mock-data";
import { ChevronRight, Shield, TrendingUp } from "lucide-react";
import Link from "next/link";
import { SetStateAction, useState } from "react";

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

  return (
    <div className="hidden lg:flex">
      <NavigationMenu value={activeMenu} onValueChange={handleMenuChange}>
        <NavigationMenuList className="gap-1">
          {/* Categories Mega Menu */}
          <NavigationMenuItem value="categories">
            <NavigationMenuTrigger className="h-10 px-4 py-2 text-sm font-medium text-slate-700 hover:text-red-600 hover:bg-red-50/50 data-[active]:bg-red-50 data-[state=open]:bg-red-50 transition-colors">
              All Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent className="!w-[800px]">
              <div className="max-h-[500px] overflow-y-auto p-6">
                <div className="grid grid-cols-3 gap-6">
                  {/* Categories Grid */}
                  <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                      {categories.map((category) => (
                        <div key={category.id} className="space-y-3">
                          <Link
                            href={`/categories/${category.slug}`}
                            onClick={handleLinkClick}
                            className="group flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                              <img
                                src={category.image.src}
                                alt={category.name}
                                className="w-6 h-6"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-slate-900 group-hover:text-red-600 transition-colors">
                                {category.name}
                              </h3>
                              <p className="text-xs text-slate-500">
                                {category.subcategories?.length || 0} subcategories
                              </p>
                            </div>
                          </Link>
                          
                          {/* Subcategories */}
                          <div className="ml-4 space-y-1">
                            {category.subcategories?.slice(0, 4).map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/categories/${category.slug}/${sub.slug}`}
                                onClick={handleLinkClick}
                                className="flex items-center justify-between text-sm text-slate-600 hover:text-red-600 hover:bg-red-50/50 px-2 py-1 rounded transition-colors group"
                              >
                                <span>{sub.name}</span>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <span className="text-xs text-slate-400">
                                    {sub.productCount?.toLocaleString()}
                                  </span>
                                  <ChevronRight className="w-3 h-3" />
                                </div>
                              </Link>
                            ))}
                            {(category.subcategories?.length || 0) > 4 && (
                              <Link
                                href={`/categories/${category.slug}`}
                                onClick={handleLinkClick}
                                className="text-xs text-red-600 hover:text-red-700 px-2 py-1 block"
                              >
                                View all {category.subcategories?.length} subcategories →
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Popular Searches & Stats */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-red-600" />
                        Popular Searches
                      </h3>
                      <div className="space-y-2">
                        {popularSearches.slice(0, 6).map((search, index) => (
                          <Link
                            key={index}
                            href={`/search?q=${encodeURIComponent(search)}`}
                            onClick={handleLinkClick}
                            className="block text-sm text-slate-600 hover:text-red-600 hover:bg-red-50/50 px-2 py-1 rounded transition-colors"
                          >
                            {search}
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-4 rounded-lg border border-red-100">
                      <h3 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-red-600" />
                        Platform Trust
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Verified Suppliers</span>
                          <span className="font-medium text-slate-900">
                            {platformStats.verifiedSuppliers.toLocaleString()}+
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Total Products</span>
                          <span className="font-medium text-slate-900">
                            {(platformStats.totalProducts / 1000000).toFixed(1)}M+
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Cities Covered</span>
                          <span className="font-medium text-slate-900">
                            {platformStats.citiesCovered}+
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
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

import { fetchMegaMenuCategories } from "@/actions/categories";
import { MegaMenuClient } from "./mega-menu";

export default async function MegaMenu() {
  // Fetch on the server to avoid importing server actions into client code
  const categories = await fetchMegaMenuCategories();

  return <MegaMenuClient initialCategories={categories} />;
}

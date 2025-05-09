// app/short-sleeve/page.tsx
import CategoryPage from "@/components/CategoryPage";
import { getCategory, getShoes } from "@/sanity/helpers";

const ShoesPage = async () => {
  const shoesProducts = await getShoes();
  const categories = await getCategory(); // optional for later

  return <CategoryPage products={shoesProducts} categories={categories} />;
};

export default ShoesPage;

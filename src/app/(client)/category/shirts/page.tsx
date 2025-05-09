// app/short-sleeve/page.tsx
import CategoryPage from "@/components/CategoryPage";
import { getCategory, getShirt } from "@/sanity/helpers";

const SHirtsPage = async () => {
  const shirtProducts = await getShirt();
  const categories = await getCategory(); // optional for later

  return <CategoryPage products={shirtProducts} categories={categories} />;
};

export default SHirtsPage;

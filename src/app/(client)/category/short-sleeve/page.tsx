// app/short-sleeve/page.tsx
import CategoryPage from "@/components/CategoryPage";
import { getCategory, getShortSleeve } from "@/sanity/helpers";

const ShortSleevePage = async () => {
  const shortSleeveProducts = await getShortSleeve();
  const categories = await getCategory(); // optional for later

  return (
    <CategoryPage products={shortSleeveProducts} categories={categories} />
  );
};

export default ShortSleevePage;

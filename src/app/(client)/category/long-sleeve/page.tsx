// app/short-sleeve/page.tsx
import CategoryPage from "@/components/CategoryPage";
import { getCategory, getLongSleeve } from "@/sanity/helpers";

const LongSleevePage = async () => {
  const longSleeveProducts = await getLongSleeve();
  const categories = await getCategory(); // optional for later

  return <CategoryPage products={longSleeveProducts} categories={categories} />;
};

export default LongSleevePage;

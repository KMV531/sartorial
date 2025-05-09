// app/short-sleeve/page.tsx
import CategoryPage from "@/components/CategoryPage";
import { getCategory, getHats } from "@/sanity/helpers";

const HatsPage = async () => {
  const HatsProducts = await getHats();
  const categories = await getCategory(); // optional for later

  return <CategoryPage products={HatsProducts} categories={categories} />;
};

export default HatsPage;

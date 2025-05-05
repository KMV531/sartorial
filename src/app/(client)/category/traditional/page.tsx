// app/short-sleeve/page.tsx
import CategoryPage from "@/components/CategoryPage";
import { getCategory, getTraditional } from "@/sanity/helpers";

const TraditionalPage = async () => {
  const traditionalProducts = await getTraditional();
  const categories = await getCategory(); // optional for later

  return (
    <CategoryPage products={traditionalProducts} categories={categories} />
  );
};

export default TraditionalPage;

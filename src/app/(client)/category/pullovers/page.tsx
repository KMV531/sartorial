// app/short-sleeve/page.tsx
import CategoryPage from "@/components/CategoryPage";
import { getCategory, getPullOvers } from "@/sanity/helpers";

const PullOverPage = async () => {
  const pullOverProducts = await getPullOvers();
  const categories = await getCategory(); // optional for later

  return <CategoryPage products={pullOverProducts} categories={categories} />;
};

export default PullOverPage;

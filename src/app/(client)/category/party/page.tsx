// app/short-sleeve/page.tsx
import CategoryPage from "@/components/CategoryPage";
import { getCategory, getParty } from "@/sanity/helpers";

const PartyPage = async () => {
  const partyProducts = await getParty();
  const categories = await getCategory(); // optional for later

  return <CategoryPage products={partyProducts} categories={categories} />;
};

export default PartyPage;

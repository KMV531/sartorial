// app/product/[slug]/page.tsx

import { getProductSlug, getSimilarProducts } from "@/sanity/helpers";
import SingleProductPageDetail from "@/components/SingleProductPageDetail";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const Product = await getProductSlug(params.slug);
  if (!Product) return notFound();

  const similarProducts = await getSimilarProducts(
    Product._id,
    Product.category
  );

  return (
    <SingleProductPageDetail
      Product={Product}
      similarProducts={similarProducts}
    />
  );
}

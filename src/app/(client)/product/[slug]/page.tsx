import { getProductSlug, getSimilarProducts } from "@/sanity/helpers";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import SingleProductDetailPage from "@/components/SingleProductDetailPage";

// Since this is a Next.js app directory function, it needs to be async
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await params to resolve slug dynamically
  const { slug } = await params;

  // Fetch product by slug
  const Product = await getProductSlug(slug);
  if (!Product) return notFound(); // If no product found, show not found page

  // Fetch category details by category ID
  const categoryWithDetails = await client.fetch(
    `*[_type == "category" && _id == $categoryId][0]{
      name,
      slug
    }`,
    { categoryId: Product?.category?._ref }
  );

  const similarProducts = await getSimilarProducts({
    categoryId: Product.category._ref,
    currentProductId: Product._id,
  });

  // Render the SingleProductPageDetail component with the fetched data
  return (
    <SingleProductDetailPage
      Product={Product}
      category={categoryWithDetails}
      similarProducts={similarProducts}
    />
  );
}

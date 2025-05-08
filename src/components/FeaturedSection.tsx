import { getProduct } from "@/sanity/helpers";
import React from "react";
import ProductGrid from "./ProductGrid";
import { Button } from "./ui/button";
import Link from "next/link";
import { Product } from "../../sanity.types";

const FeaturedSection = async () => {
  const featuredProducts = (await getProduct())
    .filter((product: Product) => product.featured)
    .slice(0, 4);
  return (
    <>
      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Featured Collection
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Our handpicked selection of premium shirts that combine style,
            comfort, and exceptional craftsmanship.
          </p>

          <ProductGrid products={featuredProducts} />

          <div className="flex justify-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedSection;

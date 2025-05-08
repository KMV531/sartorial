import { getProduct } from "@/sanity/helpers";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import ProductGrid from "./ProductGrid";

const BestSeller = async () => {
  const bestSellers = (await getProduct())
    .filter((product) => product.bestSeller)
    .slice(0, 4);
  return (
    <>
      {/* Best Sellers Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Best Sellers</h2>
            <Button asChild variant="link" className="text-brand-700">
              <Link href="/category/long-sleeve">See All</Link>
            </Button>
          </div>

          <ProductGrid products={bestSellers} />
        </div>
      </section>
    </>
  );
};

export default BestSeller;

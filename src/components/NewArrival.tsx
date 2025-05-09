import { getProduct } from "@/sanity/helpers";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import ProductGrid from "./ProductGrid";
import { Product } from "../../sanity.types";

const NewArrival = async () => {
  const newArrivals = (await getProduct())
    .filter((product: Product) => product.newArrival)
    .slice(0, 4);
  return (
    <>
      {/* New Arrivals Section */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
            <Button asChild variant="link" className="text-brand-700">
              <Link href="/category/pullovers">See All</Link>
            </Button>
          </div>

          <ProductGrid products={newArrivals} />
        </div>
      </section>
    </>
  );
};

export default NewArrival;

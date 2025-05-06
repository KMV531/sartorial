import React from "react";
import { CATEGORY_QUERYResult } from "../../sanity.types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const CategorySection = ({ category }: { category: CATEGORY_QUERYResult }) => {
  return (
    <>
      {/* Categories Section */}
      <section className="py-12 bg-brand-50">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {category.map((item) => (
              <Link
                key={item?._id}
                href={`/category/${item?.slug?.current}`}
                className="group block"
              >
                <div className="aspect-square relative overflow-hidden rounded-md">
                  {item?.image && (
                    <Image
                      width={500}
                      height={500}
                      src={urlFor(item?.image).url()}
                      alt={`${item?.name}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                    <h3 className="text-white font-semibold text-lg">
                      {item?.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategorySection;

"use client";

import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlistStore";
import { PRODUCT_QUERYResult } from "../../sanity.types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface ProductCardProps {
  product: PRODUCT_QUERYResult[0];
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, addItem, removeItem } = useWishlistStore();
  const inWishlist = isInWishlist(product._id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      removeItem(product._id);
    } else {
      addItem(product);
    }
  };

  return (
    <div className="group">
      <Link href={`/product/${product?.slug?.current}`} className="block">
        <div className="relative overflow-hidden rounded-md bg-gray-100 aspect-[3/4]">
          {/* Product Image */}
          {product?.images?.[0] && (
            <Image
              src={urlFor(product.images[0]).url()}
              alt={`${product?.name}`}
              width={500}
              height={500}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          )}

          {/* Tags/Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.newArrival && (
              <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
                New
              </span>
            )}
            {product.bestSeller && (
              <span className="bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded">
                Best Seller
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <Button
            size="icon"
            variant="secondary"
            className={`absolute top-2 right-2 rounded-full opacity-70 hover:opacity-100 ${
              inWishlist
                ? "bg-brand-100 text-red-500"
                : "bg-white text-brand-700"
            }`}
            onClick={handleWishlistToggle}
          >
            <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
          </Button>
        </div>

        <div className="mt-2">
          <h3 className="text-sm font-medium text-brand-900">{product.name}</h3>
          <p className="text-sm font-semibold mt-1 text-brand-800">
            ${product.price?.toFixed(2)}
          </p>

          {/* Color variants preview */}
          <div className="flex mt-2 gap-1">
            {Array.from(new Set(product.variants?.map((v) => v.color?.value)))
              .slice(0, 4)
              .map((color, idx) => (
                <div
                  key={idx}
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            {product.variants && product.variants.length > 4 && (
              <div className="w-3 h-3 rounded-full border border-gray-300 flex items-center justify-center text-[8px] text-gray-500">
                +
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

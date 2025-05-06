"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "../../../../sanity.types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Importing the AlertDialog components

const WishlistPage = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleRemoveFromWishlist = (
    productId: string,
    productName?: string
  ) => {
    removeItem(productId);
    toast("Item removed", {
      description: `${productName} has been removed from your wishlist.`,
      style: {
        backgroundColor: "red", // Set background color to red for errors
        color: "white", // White text color
        padding: "10px", // Padding for spacing
      },
    });
  };

  const handleMoveToCart = (product: Product) => {
    const variants = product.variants;

    if (variants && variants.length > 0) {
      const defaultVariant = variants[0];

      if (
        defaultVariant.variantId &&
        defaultVariant.size &&
        defaultVariant.color &&
        defaultVariant.color.name &&
        defaultVariant.color.value &&
        product._id &&
        product.name
      ) {
        addItem(product, defaultVariant.variantId, defaultVariant.size, {
          name: defaultVariant.color.name,
          value: defaultVariant.color.value,
        });

        // ✅ Remove from wishlist after adding to cart
        removeItem(product._id);

        toast("Item added to cart", {
          description: `${product.name} has been added to your cart.`,
          style: {
            backgroundColor: "green",
            color: "white",
            padding: "10px",
          },
        });
      } else {
        console.warn("Missing required product or variant data.");
      }
    } else {
      console.warn("Product has no variants.");
    }
  };

  const handleClearWishlist = () => {
    clearWishlist();
    toast("Wishlist cleared", {
      description: "All items have been removed from your wishlist.",
      style: {
        backgroundColor: "red", // Set background color to red for errors
        color: "white", // White text color
        padding: "10px", // Padding for spacing
      },
    });
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Wishlist</h1>
          {items.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                >
                  Clear Wishlist
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to clear your wishlist?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will remove all the items from your wishlist
                    permanently. Are you sure you want to proceed?
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearWishlist}
                    className="cursor-pointer"
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {items.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg overflow-hidden group"
                >
                  {/* Product Image with Link */}
                  <Link
                    href={`/product/${product?.slug?.current}`}
                    className="block"
                  >
                    <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
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
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-4">
                    <Link
                      href={`/product/${product?.slug?.current}`}
                      className="block"
                    >
                      <h3 className="font-medium text-brand-900 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-brand-800 font-semibold">
                        ${product.price?.toFixed(2)}
                      </p>
                    </Link>

                    {/* Actions */}
                    <div className="mt-4 flex space-x-2">
                      <Button
                        onClick={() => handleMoveToCart(product)}
                        className="flex-1 flex items-center justify-center text-sm cursor-pointer"
                        variant="outline"
                      >
                        <ShoppingCart size={16} className="mr-2" />
                        Add to Cart
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleRemoveFromWishlist(product._id, product.name)
                        }
                        className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-gray-300" />
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Save your favorite items to keep track of what you love.
            </p>
            <Button asChild size="lg">
              <Link href="/category/short-sleeve">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WishlistPage;

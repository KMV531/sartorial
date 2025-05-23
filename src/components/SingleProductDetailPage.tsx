"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Category, Product } from "../../sanity.types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { toast } from "sonner";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Layout from "./Layout";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import Head from "next/head";
import ProductGrid from "./ProductGrid";

type SingleProductProps = {
  Product: Product;
  category: Category;
  similarProducts: Product[];
};

type Size = string | null; // size can be string or null

type Color = {
  name: string; // Allow undefined for 'name'
  value: string; // Allow undefined for 'value'
} | null; // Allow null as a fallback

const SingleProductDetailPage = ({
  Product,
  category,
  similarProducts,
}: SingleProductProps) => {
  const router = useRouter();

  // Check if product is available
  const product = Product;

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  // Inside your component, construct the share URL
  const productUrl = `${process.env.NEXT_PUBLIC_URL}/product/${Product?.slug?.current}`;
  const productTitle = Product.name;
  const productDescription = Product.description;
  const productImage = product.images?.[0]?.asset
    ? urlFor(product.images[0].asset)
        .width(1200)
        .height(630)
        .format("jpg") // Ensure extension and compatibility
        .url()
    : `${process.env.NEXT_PUBLIC_URL}/assets/bg-image.jpg`; // Ensure this also ends in .webp

  const { addItem } = useCartStore();
  const {
    addItem: addToWishlist,
    isInWishlist,
    removeItem,
  } = useWishlistStore();

  // Ensure variants exist before attempting to access them
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      const firstVariant = product.variants[0];
      if (firstVariant.color?.name && firstVariant.color?.value) {
        setSelectedColor({
          name: firstVariant.color.name,
          value: firstVariant.color.value,
        });
      } else {
        setSelectedColor(null); // fallback if invalid
      }

      setSelectedSize(firstVariant.size ?? null);
    }
  }, [product]);

  const inWishlist = product ? isInWishlist(product._id) : false;

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-4">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="mt-8 cursor-pointer"
          >
            Go to Homepage
          </Button>
        </div>
      </Layout>
    );
  }

  const availableColors = Array.from(
    new Set(
      product.variants
        ?.map((v) => {
          // Check if color is defined before processing
          return v.color ? JSON.stringify(v.color) : null;
        })
        .filter(Boolean) // Remove null values from the array
    )
  ).map((c) => JSON.parse(c as string) as Color);

  const availableSizes = selectedColor
    ? product.variants
        ?.filter((v) => v.color?.value === selectedColor.value) // Check for existence of color
        .map((v) => v.size) || [] // If product.variants is undefined, return an empty array
    : [];

  const selectedVariant = product.variants?.find(
    (v) => selectedSize === v.size && selectedColor?.value === v.color?.value
  );

  const canAddToCart = selectedSize && selectedColor && selectedVariant;

  const handleAddToCart = () => {
    if (product && selectedSize && selectedColor && selectedVariant) {
      addItem(
        product,
        selectedVariant.variantId as string,
        selectedSize,
        selectedColor
      );
      toast(`${product.name} added to cart`, {
        description: `${product.name} (${selectedSize}, ${selectedColor.name}) has been added to your cart.`,
        style: {
          backgroundColor: "green", // Green background for adding
          color: "white",
          padding: "10px",
        },
      });
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (inWishlist) {
        removeItem(product._id);
        toast(`${product.name} removed from wishlist`, {
          description: "You can add it back anytime.",
          style: {
            backgroundColor: "red", // Red background for removal
            color: "white",
            padding: "10px",
          },
        });
      } else {
        addToWishlist(product);
        toast(`${product.name} added to wishlist`, {
          description: "You'll be able to find it here later.",
          style: {
            backgroundColor: "green", // Green background for adding
            color: "white",
            padding: "10px",
          },
        });
      }
    }
  };

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;

  return (
    <>
      <Head>
        <title>{productTitle} - Sartorial</title>
        <meta name="description" content={productDescription} />

        {/* Open Graph tags */}
        <meta property="og:title" content={productTitle} />
        <meta property="og:description" content={productDescription} />
        <meta property="og:image" content={productImage} />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={productUrl} />

        {/* Twitter card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={productTitle} />
        <meta name="twitter:description" content={productDescription} />
        <meta name="twitter:image" content={productImage} />
      </Head>
      <Layout>
        <div className="container-custom py-8">
          <nav className="text-sm mb-6">
            <ol className="flex items-center space-x-2">
              <li>
                <Button
                  onClick={() => router.push("/")}
                  variant="link"
                  className="p-0 h-auto text-brand-600 cursor-pointer"
                >
                  Home
                </Button>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Button
                  onClick={() =>
                    router.push(`/category/${category?.slug?.current}`)
                  }
                  variant="link"
                  className="p-0 h-auto text-brand-600 cursor-pointer"
                >
                  {category.name &&
                    category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                </Button>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-brand-900 font-medium truncate">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-gray-100 rounded-md overflow-hidden">
                {product?.images && (
                  <Image
                    width={600}
                    height={600}
                    priority
                    src={urlFor(product.images?.[selectedImage]).url()}
                    alt={`${product?.name}`}
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </div>

              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images?.map((image, idx) => (
                  <button
                    key={idx}
                    className={`border-2 rounded-md overflow-hidden flex-shrink-0 w-16 h-20 ${
                      selectedImage === idx
                        ? "border-brand-700"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <Image
                      width={100}
                      height={100}
                      src={urlFor(image).width(200).height(200).url()}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover object-center cursor-pointer"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-brand-900">
                {product.name}
              </h1>

              <div className="mt-4">
                <p className="text-2xl font-semibold">
                  $
                  {currentPrice !== undefined
                    ? currentPrice.toFixed(2)
                    : product.price?.toFixed(2)}
                </p>
              </div>

              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={16}
                      className={
                        idx < Math.floor(product.rating || 0)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviews?.length || 0} reviews)
                </span>
              </div>

              <div className="mt-4 text-gray-700">
                <p>{product.description}</p>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-brand-900">Color</h3>
                  {selectedColor && (
                    <span className="text-sm text-gray-600">
                      {selectedColor.name}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 mt-2">
                  {availableColors.map((color) => (
                    <button
                      key={color?.name}
                      onClick={() => {
                        setSelectedColor(color);
                        setSelectedSize(null);
                      }}
                      className={`w-8 h-8 cursor-pointer rounded-full border-2 flex items-center justify-center ${
                        selectedColor?.value === color?.value
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color?.value,
                      }}
                      title={color?.name}
                    >
                      {selectedColor?.value === color?.value && (
                        <span
                          className={`text-xs ${
                            color?.value === "#FFFFFF" ||
                            color?.value === "#F5F5DC"
                              ? "text-black"
                              : "text-white"
                          }`}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-brand-900">Size</h3>
                  {selectedSize && (
                    <span className="text-sm text-gray-600">
                      {selectedSize}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {["S", "M", "L", "XL"].map((size) => {
                    const isAvailable = availableSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() =>
                          isAvailable && setSelectedSize(size as Size)
                        }
                        disabled={!isAvailable}
                        className={`py-2 border rounded-md cursor-pointer ${
                          !selectedColor
                            ? "border-gray-200 text-gray-400 cursor-not-allowed"
                            : isAvailable
                              ? selectedSize === size
                                ? "border-brand-700 bg-brand-100 text-brand-900"
                                : "border-gray-300 text-brand-800 hover:border-brand-700"
                              : "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                {!selectedColor && (
                  <p className="text-sm text-gray-600 mt-1">
                    Please select a color first
                  </p>
                )}
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                  className="w-full flex items-center justify-center cursor-pointer"
                  size="lg"
                >
                  <ShoppingCart className="mr-2" size={18} />
                  Add to Cart
                </Button>

                <Button
                  onClick={handleWishlistToggle}
                  variant={inWishlist ? "secondary" : "outline"}
                  className="w-full flex items-center justify-center cursor-pointer"
                  size="lg"
                >
                  <Heart
                    className={`mr-2 ${inWishlist ? "text-red-500 fill-red-500" : ""}`}
                    size={18}
                  />
                  {inWishlist ? "In Wishlist" : "Add to Wishlist"}
                </Button>
              </div>

              <div className="mt-8 border-t pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-brand-900">
                      Shipping
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Free shipping on orders over $100
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-brand-900">
                      Returns
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Free 30-day returns
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-brand-900 mb-2">
                    Share This Product
                  </h4>
                  <div className="flex space-x-3">
                    <FacebookShareButton url={productUrl} title={productTitle}>
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={productUrl} title={productTitle}>
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <WhatsappShareButton url={productUrl} title={productTitle}>
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    <LinkedinShareButton url={productUrl} title={productTitle}>
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Product Details</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-700">{product.description}</p>
                <p className="text-gray-700 mt-4">
                  Crafted with quality and designed for everyday use, this
                  product blends style, functionality, and comfort. Whether
                  you&apos;re upgrading your essentials or treating yourself to
                  something new, it&apos;s built to deliver reliable performance
                  and timeless appeal. Made to suit a variety of preferences,
                  it&apos;s a versatile choice for anyone looking to enhance
                  their lifestyle.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Features</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Premium quality fabric</li>
                  <li>Comfort fit design</li>
                  <li>Durable stitching</li>
                  <li>Easy care instructions</li>
                  <li>Available in multiple colors and sizes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review?._key} className="border-b pb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, idx) => (
                            <Star
                              key={idx}
                              size={14}
                              className={
                                idx < (review.rating ?? 0) // Fallback to 0 if review.rating is undefined
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <h4 className="font-medium mt-1">
                          {review.user?.name}
                        </h4>
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet for this product.</p>
            )}

            <Button variant="outline" className="mt-6 cursor-pointer">
              Write a Review
            </Button>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            {similarProducts && similarProducts.length > 0 ? (
              <ProductGrid products={similarProducts} />
            ) : (
              <p className="text-gray-600">No similar products found.</p>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SingleProductDetailPage;

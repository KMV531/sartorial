"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const CartPage = () => {
  const router = useRouter();
  const [promoCode, setPromoCode] = useState("");

  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleRemove = (itemId: string) => {
    removeItem(itemId);
    toast("Item removed", {
      description: "The item has been removed from your cart.",
      style: {
        backgroundColor: "red", // Set background color to red for errors
        color: "white", // White text color
        padding: "10px", // Padding for spacing
      },
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast("Cart cleared", {
      description: "All items have been removed from your cart.",
      style: {
        backgroundColor: "red", // Set background color to red for errors
        color: "white", // White text color
        padding: "10px", // Padding for spacing
      },
    });
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();

    if (promoCode.toLowerCase() === "discount10") {
      toast("Promo code applied", {
        description: "10% discount has been applied to your order!",
        style: {
          backgroundColor: "green",
          color: "white",
          padding: "10px",
        },
      });
    } else {
      toast("Invalid promo code", {
        description: "Please check your promo code and try again.",
        style: {
          backgroundColor: "red",
          color: "white",
          padding: "10px",
        },
      });
    }
  };

  const handleProceedToCheckout = () => {
    // This would be replaced with actual checkout logic
    router.push("/checkout");
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Responsive Cart Items */}
              <div className="rounded-lg border overflow-hidden">
                {/* Mobile/Tablet Layout */}
                <div className="lg:hidden space-y-6">
                  {items.map((item) => {
                    const variant = item.product.variants?.find(
                      (v) => v.variantId === item.variantId
                    );
                    const price = variant?.price || item.product.price;
                    const subtotal = price && price * item.quantity;

                    return (
                      <div
                        key={item.variantId}
                        className="flex gap-6 border-b pb-4"
                      >
                        {/* Image */}
                        <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                          {item.product.images && (
                            <Image
                              width={96}
                              height={96}
                              src={urlFor(item.product.images[0])
                                .width(96)
                                .height(96)
                                .url()}
                              alt={`${item.product.name}`}
                              className="w-full h-full object-cover object-center"
                            />
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex flex-col justify-between flex-1 text-sm">
                          <Link
                            href={`/product/${item.product.slug?.current}`}
                            className="text-brand-900 font-medium hover:text-brand-700 line-clamp-2"
                          >
                            {item.product.name}
                          </Link>

                          <div className="text-gray-600 mt-1">
                            Size: {item.selectedSize}
                          </div>
                          <div className="flex items-center text-gray-600 mt-1">
                            <span>Color:</span>
                            <span
                              className="ml-1 w-3 h-3 rounded-full border border-gray-300"
                              style={{
                                backgroundColor: item.selectedColor.value,
                              }}
                            ></span>
                            <span className="ml-1">
                              {item.selectedColor.name}
                            </span>
                          </div>

                          <div className="text-gray-900 font-medium mt-2">
                            Price: ${price?.toFixed(2)}
                          </div>

                          <div className="flex items-center mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full cursor-pointer"
                              onClick={() =>
                                handleQuantityChange(
                                  item.variantId,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </Button>
                            <span className="mx-2 w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full cursor-pointer"
                              onClick={() =>
                                handleQuantityChange(
                                  item.variantId,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus size={14} />
                            </Button>
                          </div>

                          <div className="text-gray-900 mt-2 font-medium">
                            Subtotal: ${subtotal?.toFixed(2)}
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemove(item.variantId)}
                            className="text-red-500 mt-2 self-start cursor-pointer"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Desktop Layout (original table) */}
                <table className="w-full hidden lg:table">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="py-4 px-4 text-left text-sm font-medium text-gray-700">
                        Product
                      </th>
                      <th className="py-4 px-4 text-center text-sm font-medium text-gray-700">
                        Price
                      </th>
                      <th className="py-4 px-4 text-center text-sm font-medium text-gray-700">
                        Quantity
                      </th>
                      <th className="py-4 px-4 text-right text-sm font-medium text-gray-700">
                        Subtotal
                      </th>
                      <th className="py-4 px-4 text-right text-sm font-medium text-gray-700">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
                      const variant = item.product.variants?.find(
                        (v) => v.variantId === item.variantId
                      );
                      const price = variant?.price || item.product.price;
                      const subtotal = price && price * item.quantity;

                      return (
                        <tr key={item.variantId} className="border-b">
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100 mr-4">
                                {item.product.images && (
                                  <Image
                                    width={80}
                                    height={80}
                                    src={urlFor(item.product.images[0])
                                      .width(80)
                                      .height(80)
                                      .url()}
                                    alt={`${item.product.name}`}
                                    className="w-full h-full object-cover object-center"
                                  />
                                )}
                              </div>
                              <div>
                                <Link
                                  href={`/product/${item.product.slug?.current}`}
                                  className="text-brand-900 font-medium hover:text-brand-700 line-clamp-2"
                                >
                                  {item.product.name}
                                </Link>
                                <div className="mt-1 text-sm text-gray-500">
                                  <span className="block">
                                    Size: {item.selectedSize}
                                  </span>
                                  <div className="flex items-center">
                                    <span>Color:</span>
                                    <span
                                      className="ml-1 w-3 h-3 rounded-full border border-gray-300"
                                      style={{
                                        backgroundColor:
                                          item.selectedColor.value,
                                      }}
                                    ></span>
                                    <span className="ml-1">
                                      {item.selectedColor.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center text-gray-700">
                            ${price?.toFixed(2)}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex justify-center items-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full cursor-pointer"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.variantId,
                                    item.quantity - 1
                                  )
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} />
                              </Button>
                              <span className="mx-3 w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full cursor-pointer"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.variantId,
                                    item.quantity + 1
                                  )
                                }
                              >
                                <Plus size={14} />
                              </Button>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right text-gray-900 font-medium">
                            ${subtotal?.toFixed(2)}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemove(item.variantId)}
                              className="text-gray-500 hover:text-red-500 cursor-pointer"
                            >
                              <Trash2 size={18} />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Cart Actions */}
              <div className="flex flex-wrap justify-between items-center mt-6 gap-4">
                <Button
                  variant="outline"
                  onClick={() => router.push("/category/shoes")}
                  className="text-brand-700 cursor-pointer"
                >
                  Continue Shopping
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                    >
                      Clear Cart
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will remove all items from your shopping
                        cart. This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleClearCart}
                        className="cursor-pointer"
                      >
                        Clear Cart
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-brand-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items ({totalItems}):</span>
                    <span className="text-gray-900 font-medium">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="text-gray-900 font-medium">
                      {totalPrice >= 100 ? "Free" : "$10.00"}
                    </span>
                  </div>
                  {totalPrice >= 100 && (
                    <div className="text-green-600 text-sm">
                      You&apos;ve qualified for free shipping!
                    </div>
                  )}
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-brand-900 mb-2">
                    Promo Code
                  </h3>
                  <form onSubmit={handleApplyPromo} className="flex space-x-2">
                    <Input
                      value={promoCode}
                      onChange={(e: {
                        target: { value: React.SetStateAction<string> };
                      }) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                    >
                      Apply
                    </Button>
                  </form>
                  <p className="text-xs text-gray-500 mt-1">
                    Try &quot;DISCOUNT10&quot; for 10% off
                  </p>
                </div>

                {/* Total */}
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-brand-900">
                    <span className="font-medium">Total:</span>
                    <span className="font-semibold text-lg">
                      ${(totalPrice + (totalPrice >= 100 ? 0 : 10)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleProceedToCheckout}
                  className="w-full cursor-pointer"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>

                {/* Additional Info */}
                <div className="mt-6 text-xs text-gray-500 space-y-2">
                  <p>
                    Shipping costs are calculated at checkout based on delivery
                    location.
                  </p>
                  <p>
                    Taxes will be calculated at checkout based on delivery
                    address.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 max-w-md mx-auto">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
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

export default CartPage;

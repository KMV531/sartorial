"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Loader2, Trash2 } from "lucide-react";

export default function CheckoutPage() {
  const { user } = useUser();
  const { items, getTotalPrice, removeItem } = useCartStore();
  const totalPrice = getTotalPrice();
  const shippingCost = totalPrice >= 100 ? 0 : 10; // Free shipping over $100
  const [formData, setFormData] = useState({
    name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    phone: "",
    address: "",
    paymentMethod: "mobile" as "mobile" | "card" | "bank",
    bankDetails: { accountNumber: "", bankCode: "" },
  });
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          customerName: formData.name, // ✅ used in payerNote
          cartItems: items, // ✅ used in webhook
          customer: {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            phone: formData.phone,
          }, // ✅ used in webhook
          totalAmount: getTotalPrice() + shippingCost, // safer total
          discountAmount: 0, // or actual value if you support discounts
        }),
      });

      const data = await response.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div className="space-y-4">
          {/* Customer Info */}

          {/* Name */}
          <input
            required
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input"
          />

          {/* Email */}
          <input
            required
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="input"
          />

          {/* Address */}
          <input
            required
            type="text"
            placeholder="Your Delivery Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="input"
          />

          {/* Payment Method Selection */}
          <select
            value={formData.paymentMethod}
            onChange={(e) =>
              setFormData({
                ...formData,
                paymentMethod: e.target.value as "mobile" | "card" | "bank",
              })
            }
            className="input"
          >
            <option value="mobile">Mobile Money</option>
            <option value="card">Credit/Debit Card</option>
            <option value="bank">Bank Transfer</option>
          </select>

          {/* Conditional fields based on payment method */}
          {formData.paymentMethod === "mobile" && (
            <input
              required
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="input"
            />
          )}

          {formData.paymentMethod === "bank" && (
            <>
              <input
                required
                type="text"
                placeholder="Account Number"
                value={formData.bankDetails.accountNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bankDetails: {
                      ...formData.bankDetails,
                      accountNumber: e.target.value,
                    },
                  })
                }
                className="input"
              />
              <select
                required
                value={formData.bankDetails.bankCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bankDetails: {
                      ...formData.bankDetails,
                      bankCode: e.target.value,
                    },
                  })
                }
                className="input"
              >
                <option value="">Select Bank</option>
                <option value="BICEC">BICEC</option>
                <option value="ECOBANK">Ecobank</option>
              </select>
            </>
          )}
        </div>

        <div>
          {/* Order Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cart Items Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Your Items</h2>

              {items.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const variant = item.product.variants?.find(
                      (v) => v.variantId === item.variantId
                    );
                    const price = variant?.price || item.product.price || 0;
                    const subtotal = price * item.quantity;

                    return (
                      <div
                        key={item.variantId}
                        className="flex gap-4 border-b pb-4"
                      >
                        <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                          {item.product.images && (
                            <Image
                              width={80}
                              height={80}
                              src={urlFor(item.product.images[0]).url()}
                              alt={`${item.product.name}`}
                              className="object-cover w-full h-full"
                            />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{item.product.name}</h3>
                            <button
                              onClick={() => removeItem(item.variantId)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          <div className="text-sm text-gray-600 mt-1">
                            {item.selectedSize && (
                              <p>Size: {item.selectedSize}</p>
                            )}
                            {item.selectedColor && (
                              <div className="flex items-center">
                                <span>Color: </span>
                                <span
                                  className="w-3 h-3 rounded-full border border-gray-300 ml-1"
                                  style={{
                                    backgroundColor: item.selectedColor.value,
                                  }}
                                />
                                <span className="ml-1">
                                  {item.selectedColor.name}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-between items-center mt-2">
                            <div className="text-gray-900 font-medium">
                              ${price.toFixed(2)} × {item.quantity}
                            </div>
                            <div className="font-semibold">
                              ${subtotal.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Order Summary Section */}
            <div className="bg-gray-50 p-6 rounded-lg h-fit sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>
                    Subtotal (
                    {items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    items):
                  </span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>
                    {shippingCost === 0
                      ? "FREE"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                {totalPrice >= 100 && (
                  <div className="text-green-600 text-sm">
                    You&apos;ve qualified for free shipping!
                  </div>
                )}

                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${(totalPrice + shippingCost).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment form would go here */}
              <Button
                className="w-full mt-6 cursor-pointer"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Payment"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

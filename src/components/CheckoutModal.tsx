"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

// 👇 This must be outside the component
function prepareCartPayload() {
  const cartItems = useCartStore.getState().items;

  return cartItems.map((item) => {
    const variant = item?.product?.variants?.find(
      (v) => v.variantId === item.variantId
    );

    return {
      productId: item.productId,
      variantId: item.variantId,
      name: item.product.name,
      price: variant?.price ?? item.product.price ?? 0,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
      productImage: item.product.images?.[0] || null, // first image or null
    };
  });
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ open, onClose }) => {
  const { getTotalPrice } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const { user, isSignedIn } = useUser();
  const [formData, setFormData] = useState({
    name: isSignedIn && user ? user.fullName || "" : "",
    email:
      isSignedIn && user ? user.primaryEmailAddress?.emailAddress || "" : "",
    phone: "",
    address: "",
    paymentMethod: "mobile" as "mobile" | "card" | "bank",
    bankDetails: { accountNumber: "", bankCode: "" },
  });

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.address) {
      toast("Incomplete Form", {
        description: "Please fill out all required fields.",
        style: { backgroundColor: "red", color: "white", padding: "10px" },
      });
      return;
    }

    if (formData.paymentMethod === "mobile" && !formData.phone) {
      toast("Phone Required", {
        description: "Please enter your phone number for mobile payment.",
        style: { backgroundColor: "red", color: "white", padding: "10px" },
      });
      return;
    }

    if (
      formData.paymentMethod === "bank" &&
      (!formData.bankDetails.accountNumber || !formData.bankDetails.bankCode)
    ) {
      toast("Bank Details Required", {
        description: "Please enter your bank account details.",
        style: { backgroundColor: "red", color: "white", padding: "10px" },
      });
      return;
    }

    const cartPayload = prepareCartPayload();

    setIsLoading(true);
    try {
      const response = await fetch("/api/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          customerName: formData.name,
          cartItems: cartPayload,
          customer: {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            phone: formData.phone,
          },
          totalAmount: cartPayload.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          ),
          discountAmount: 0,
        }),
      });

      const data = await response.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Payment failed", {
        description: "There was an error processing your payment.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name:</label>
            <Input
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <Input
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Delivery Address:
            </label>
            <Input
              placeholder="Enter your full address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Method:
            </label>
            <select
              value={formData.paymentMethod}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  paymentMethod: e.target.value as "mobile" | "card" | "bank",
                })
              }
              className="w-full border px-3 py-2 rounded text-sm cursor-pointer"
            >
              <option value="mobile">Mobile Money</option>
              <option value="card">Credit/Debit Card</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>

          {formData.paymentMethod === "mobile" && (
            <div className="flex items-center border rounded overflow-hidden">
              <span className="px-3 bg-gray-200 text-gray-700 select-none">
                +237
              </span>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, phone: val });
                }}
                className="flex-1 border-none focus:ring-0 focus:outline-none"
                required
              />
            </div>
          )}

          {formData.paymentMethod === "bank" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Account Number:
                </label>
                <Input
                  placeholder="Enter account number"
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
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Select Bank:
                </label>
                <select
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
                  className="w-full border px-3 py-2 rounded text-sm cursor-pointer"
                  required
                >
                  <option value="">Select Bank</option>
                  <option value="BICEC">BICEC</option>
                  <option value="ECOBANK">Ecobank</option>
                </select>
              </div>
            </>
          )}

          <div className="pt-4 border-t">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          <Button
            className="w-full mt-4 cursor-pointer"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Payment...
              </>
            ) : (
              "Proceed to Payment"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;

"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { urlFor } from "@/sanity/lib/image";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ open, onClose }) => {
  const { user, isSignedIn } = useUser();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const handleConfirmOrder = () => {
    if (!username || !email || !phone || !address) {
      toast("Incomplete Form", {
        description: "Please fill out all fields.",
        style: {
          backgroundColor: "red",
          color: "white",
          padding: "10px",
        },
      });
      return;
    }

    const orderLines = items
      .map((item) => {
        const variant = item.product.variants?.find(
          (v) => v.variantId === item.variantId
        );
        const price = variant?.price || item.product.price;
        const imageUrl = item.product.images?.[0]
          ? urlFor(item.product.images[0]).url()
          : "No image";
        return `• ${item.product.name}
  Size: ${item.selectedSize}
  Color: ${item.selectedColor.name}
  Quantity: ${item.quantity}
  Price: $${price}
  Image: ${imageUrl}`;
      })
      .join("\n\n");

    // Make sure phone starts with +237
    const fullPhone = phone.startsWith("+237") ? phone : "+237" + phone;

    const totalPrice = getTotalPrice();
    const message = `*New Order*

Name: ${username}
Email: ${email}
Phone: ${fullPhone}
Address: ${address}
Payment Method: ${paymentMethod}

*Order Details:*
${orderLines}

*Total:* $${totalPrice.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/237690857180?text=${encodedMessage}`; // Replace with your number

    // Immediately reset and close modal
    setUsername("");
    setEmail("");
    setPhone("");
    setAddress("");
    setPaymentMethod("Cash on Delivery");
    clearCart();
    onClose();

    // Show success toast first
    toast.success("Order sent! Opening WhatsApp...", {
      style: { backgroundColor: "green", color: "white", padding: "10px" },
      duration: 2000,
    });

    // Then open WhatsApp after toast duration
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 2100);
  };

  useEffect(() => {
    if (isSignedIn && user) {
      setUsername(user.username || "");
      setEmail(user.primaryEmailAddress?.emailAddress || "");
    }
  }, [user, isSignedIn]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Provide Delivery Information</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username:</label>
            <Input
              placeholder="Enter your full name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <Input
              placeholder="Enter your full name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>
          <div className="flex items-center border rounded overflow-hidden">
            <span className="px-3 bg-gray-200 text-gray-700 select-none">
              +237
            </span>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setPhone(val);
              }}
              className="flex-1 border-none focus:ring-0 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Delivery Address:
            </label>
            <Input
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Method:
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border px-3 py-2 rounded text-sm cursor-pointer"
            >
              <option>Cash on Delivery</option>
              <option>MTN Mobile Money</option>
              <option>Orange Money</option>
            </select>
          </div>

          <Button
            className="w-full mt-4 cursor-pointer"
            onClick={handleConfirmOrder}
          >
            Confirm Order via WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;

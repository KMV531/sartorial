"use client";

import { useCartStore } from "@/store/cartStore";
import { Check, Home, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, Suspense } from "react";

export const dynamic = "force-dynamic"; // disable static prerendering

function PageContent() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId");
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (requestId) {
      clearCart();
    }
  }, [requestId, clearCart]);

  return (
    <div className="py-10 md:py-20 bg-gradient-to-br from-green-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <Check className="text-teal-600 w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Order Confirmed!
        </h1>
        <div className="space-y-4 mb-8 text-left text-gray-600">
          <p>
            Thank you for your purchase. We&apos;re processing your order and
            will ship it soon. A confirmation email with your order details will
            be sent to your inbox shortly.
          </p>
          <p>
            Order Number:{" "}
            <span className="text-black font-semibold">{requestId}</span>
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <h2 className="font-semibold text-gray-800 mb-2">
            What&apos;s Next?
          </h2>
          <ul className="text-green-700 text-sm space-y-1">
            <li>Check your email for order confirmation.</li>
            <li>We&apos;ll notify you when your order ships.</li>
            <li>Track your order status anytime.</li>
          </ul>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md hoverEffect"
          >
            <Home className="w-5 h-5 mr-2" /> Home
          </Link>
          <Link
            href="/orders"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md hoverEffect"
          >
            <Package className="w-5 h-5 mr-2" />
            Orders
          </Link>
          <Link
            href="/category/shoes"
            className="flex items-center justify-center px-4 py-3 font-semibold bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md hoverEffect"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

const SuccessPage = () => {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default SuccessPage;

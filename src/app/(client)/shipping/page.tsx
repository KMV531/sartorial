import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ShippingPolicyPage = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-5 lg:px-0">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-900 mb-8">
            Shipping Policy
          </h1>

          <div className="prose prose-lg mx-auto">
            <p className="text-gray-700 mb-6">
              At Sartorial, we want your shopping experience to be as smooth as
              possible. Our shipping policy is designed to give you clear
              expectations and timely updates on your order.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              Shipping Timeframes
            </h2>
            <p className="text-gray-700 mb-6">
              Orders are typically processed within 1-3 business days. Once your
              order has been processed and shipped, you will receive a
              confirmation email with tracking details. Depending on your
              location, shipping times can vary:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Domestic Shipping: 3-7 business days</li>
              <li>International Shipping: 7-14 business days</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              Shipping Rates
            </h2>
            <p className="text-gray-700 mb-6">
              Shipping costs are calculated at checkout based on your location
              and the size of your order. We offer free standard shipping on all
              domestic orders over $100.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              Order Tracking
            </h2>
            <p className="text-gray-700 mb-6">
              Once your order has shipped, you will receive an email with
              tracking information. You can use this to monitor the status of
              your package. Please allow up to 24 hours for tracking information
              to update after receiving the email.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              International Shipping
            </h2>
            <p className="text-gray-700 mb-6">
              We currently offer international shipping to select countries.
              Please note that customs fees, taxes, and import duties may apply
              depending on your country&apos;s regulations. Sartorial is not
              responsible for any additional charges that may be incurred during
              international shipping.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              Shipping Delays
            </h2>
            <p className="text-gray-700 mb-6">
              While we strive to get your order to you as quickly as possible,
              please note that delays may occur due to factors beyond our
              control, such as weather, holidays, or customs inspections. We
              appreciate your patience during these times.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              Lost or Damaged Packages
            </h2>
            <p className="text-gray-700 mb-6">
              In the rare event that your package is lost or damaged during
              shipping, please contact our customer service team within 7 days
              of receiving your order. We will do our best to resolve the issue
              as quickly as possible.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/category/short-sleeve" className="text-white">
                Shop Our Collection
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact" className="text-brand-900">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingPolicyPage;

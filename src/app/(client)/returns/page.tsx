import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ReturnsExchangesPage = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-5 lg:px-0">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-900 mb-8">
            Returns & Exchanges
          </h1>

          <div className="prose prose-lg mx-auto">
            <p className="text-gray-700 mb-6">
              At Sartorial, we want you to be completely satisfied with your
              purchase. If you&apos;re not happy with your order, our returns
              and exchanges policy ensures that you have options to resolve the
              situation. Please review the details below for how to process
              returns or exchanges.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              Return Policy
            </h2>
            <p className="text-gray-700 mb-6">
              You can return most items within 30 days of receiving your order
              for a full refund. Items must be in their original condition,
              unworn, unwashed, and with all tags attached. Any returns that
              don&apos;t meet these conditions may be rejected or subject to
              restocking fees.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              Exchanges
            </h2>
            <p className="text-gray-700 mb-6">
              We offer exchanges on items within 30 days of receiving your
              order. To exchange an item, please ensure it is in its original
              condition. If you need to exchange for a different size or color,
              simply initiate the return process and place a new order for the
              desired item.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              How to Initiate a Return or Exchange
            </h2>
            <ol className="list-decimal pl-6 mb-6 text-gray-700">
              <li>
                Log in to your account and go to the &quot;Orders&quot; section.
              </li>
              <li>Select the order you want to return or exchange.</li>
              <li>
                Click on &quot;Return/Exchange&quot; and follow the prompts to
                generate a return label.
              </li>
              <li>
                Package your items securely, including the original tags and
                packaging.
              </li>
              <li>
                Drop off the return package at the designated carrier location.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              Non-Returnable Items
            </h2>
            <p className="text-gray-700 mb-6">
              The following items cannot be returned or exchanged:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Gift cards</li>
              <li>Final sale or clearance items</li>
              <li>
                Items that have been worn, washed, or damaged after delivery
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              Refunds
            </h2>
            <p className="text-gray-700 mb-6">
              Once your return is received and inspected, we will process your
              refund to the original payment method within 7-10 business days.
              Shipping fees are non-refundable.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              Return Shipping Costs
            </h2>
            <p className="text-gray-700 mb-6">
              Return shipping costs are the responsibility of the customer
              unless the return is due to an error on our part (e.g., wrong item
              sent). We recommend using a trackable shipping service or
              purchasing shipping insurance for returns to ensure they are
              returned safely.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              Damaged or Incorrect Items
            </h2>
            <p className="text-gray-700 mb-6">
              If you receive a damaged or incorrect item, please contact our
              customer service team immediately with photos of the item and
              packaging. We will arrange a return, exchange, or refund at no
              additional cost to you.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/products" className="text-white">
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

export default ReturnsExchangesPage;

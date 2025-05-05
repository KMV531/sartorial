import React from "react";
import { Button } from "./ui/button";

const NewsLetterSection = () => {
  return (
    <>
      {/* Newsletter Section */}
      <section className="py-12 bg-brand-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              Subscribe to our Newsletter
            </h2>
            <p className="mt-4 text-brand-200">
              Sign up to receive updates on new collections, exclusive offers,
              and styling tips.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-brand-700 bg-brand-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button className="bg-white text-brand-900 hover:bg-brand-100 cursor-pointer">
                Subscribe
              </Button>
            </div>

            <p className="mt-4 text-sm text-brand-300">
              By subscribing, you agree to our privacy policy and consent to
              receive marketing emails.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsLetterSection;

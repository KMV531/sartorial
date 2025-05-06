import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutPage = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-5 lg:px-0">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-900 mb-8">
            About SARTORIAL
          </h1>

          <div className="prose prose-lg mx-auto">
            <p className="text-gray-700 mb-6">
              Founded in 2023, SARTORIAL is a premium fashion brand committed to
              crafting sophisticated, timeless clothing. We aim to deliver
              high-quality garments that bring elegance and confidence to your
              everyday wardrobe.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              Our Mission
            </h2>
            <p className="text-gray-700 mb-6">
              At Sartorial, our mission is to make every piece of clothing
              reflect the artistry of fine tailoring, all while being
              functional, sustainable, and accessible. We believe in bringing
              out the best in our customers with high-quality fabrics and
              refined designs.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              Quality & Craftsmanship
            </h2>
            <p className="text-gray-700 mb-6">
              We take pride in our craftsmanship. Each item is carefully made,
              ensuring that every stitch, seam, and fabric choice is carefully
              considered. Our garments are made to last, combining classic
              styles with modern techniques, so you can enjoy them season after
              season.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              Sustainability
            </h2>
            <p className="text-gray-700 mb-6">
              Sustainability is at the heart of Sartorial. From eco-friendly
              production practices to responsibly sourced materials, we aim to
              reduce our impact on the environment. We believe that style and
              sustainability can go hand-in-hand.
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

export default AboutPage;

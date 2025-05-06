import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PrivacyPolicyPage = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-5 lg:px-0">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-900 mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-lg mx-auto text-left">
            <p className="text-gray-700 mb-6">
              At SARTORIAL, we value your privacy and are committed to
              protecting your personal information. This Privacy Policy outlines
              how we collect, use, and safeguard your data when you visit our
              website and use our services. By using our website, you agree to
              the terms outlined in this policy.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 mb-6">
              We collect various types of information when you use our website,
              including:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>
                <strong>Personal Information:</strong> This includes your name,
                email address, shipping address, and payment details when you
                make a purchase.
              </li>
              <li>
                <strong>Non-Personal Information:</strong> This includes your
                browsing behavior, device information, IP address, and cookies.
              </li>
              <li>
                <strong>Transaction Data:</strong> Details about the products
                you purchase, payment methods, and transaction history.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-6">
              The information we collect is used for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>
                To process and fulfill your orders, including shipping and
                payment processing.
              </li>
              <li>To improve your shopping experience on our website.</li>
              <li>
                To send you promotional offers, updates, and newsletters (only
                if you have opted in).
              </li>
              <li>
                To respond to customer service inquiries and provide support.
              </li>
              <li>
                To detect, prevent, and address fraudulent activities or
                security breaches.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              3. Data Protection and Security
            </h2>
            <p className="text-gray-700 mb-6">
              We use industry-standard security measures to protect your
              personal information. These measures include encryption, secure
              payment gateways, and secure storage of data. However, no method
              of data transmission over the internet or electronic storage is
              completely secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              4. Sharing Your Information
            </h2>
            <p className="text-gray-700 mb-6">
              We do not sell, rent, or trade your personal information to third
              parties. We may share your data with trusted third parties in the
              following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>
                With service providers who assist in processing payments,
                shipping orders, or providing customer support.
              </li>
              <li>
                With law enforcement or regulatory authorities if required by
                law or to protect our rights or the rights of others.
              </li>
              <li>
                If we are involved in a business transaction, such as a merger
                or acquisition, your information may be transferred as part of
                that transaction.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              5. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 mb-6">
              Our website uses cookies and similar tracking technologies to
              enhance your browsing experience. Cookies are small files stored
              on your device that allow us to remember your preferences, login
              status, and browsing history.
            </p>
            <p className="text-gray-700 mb-6">
              You can control the use of cookies through your browser settings.
              However, disabling cookies may affect the functionality of our
              website.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              6. Your Rights and Choices
            </h2>
            <p className="text-gray-700 mb-6">
              Depending on your location and applicable data protection laws,
              you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>
                <strong>Access:</strong> You can request access to the personal
                data we hold about you.
              </li>
              <li>
                <strong>Correction:</strong> You can request to update or
                correct any inaccuracies in your personal data.
              </li>
              <li>
                <strong>Deletion:</strong> You can request the deletion of your
                personal data, subject to certain conditions.
              </li>
              <li>
                <strong>Opt-Out:</strong> You can opt-out of receiving marketing
                communications from us at any time.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              7. Data Retention
            </h2>
            <p className="text-gray-700 mb-6">
              We will retain your personal information for as long as necessary
              to fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              8. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page, and the &quot;Last Updated&quot; date
              at the top will be revised. We encourage you to review this policy
              periodically to stay informed about how we are protecting your
              data.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-brand-800">
              9. Contact Us
            </h2>
            <p className="text-gray-700 mb-6">
              If you have any questions or concerns about this Privacy Policy or
              how we handle your personal data, please contact us at:
            </p>
            <p className="text-gray-700 mb-6">
              Email:{" "}
              <a href="mailto:support@sartorial.com" className="text-brand-900">
                support@sartorial.com
              </a>
            </p>
            <p className="text-gray-700 mb-6">
              Address: Sartorial, 123 Fashion St., City, State, ZIP
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

export default PrivacyPolicyPage;

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {
      name:
        formData.name.length < 2 ? "Name must be at least 2 characters" : "",
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? "Please enter a valid email address"
        : "",
      subject:
        formData.subject.length < 5
          ? "Subject must be at least 5 characters"
          : "",
      message:
        formData.message.length < 10
          ? "Message must be at least 10 characters"
          : "",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      toast.success("Message sent successfully! We will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      toast.error("Please fill out the form correctly.");
    }
  };

  return (
    <section>
      <div className="container mx-auto px-5 lg:px-0 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <p className="text-gray-600 mb-6">
                We&apos;re here to help! Fill out the form and we&apos;ll get
                back to you as soon as possible.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">support@sartorial.com</p>
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">
                    Sartorial
                    <br />
                    123 Fashion St.
                    <br />
                    City, State, ZIP
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="block font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is this about?"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.subject && (
                    <p className="text-red-500">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block font-medium">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please provide details..."
                    className="w-full p-2 border border-gray-300 rounded min-h-[120px]"
                  />
                  {errors.message && (
                    <p className="text-red-500">{errors.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full cursor-pointer">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

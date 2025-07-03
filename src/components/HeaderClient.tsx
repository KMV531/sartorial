"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, Heart, X, SearchIcon } from "lucide-react";
import Link from "next/link";
import UserAuthSection from "./UserAuthSection";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { Search } from "./Search";
import Image from "next/image";
import { Order } from "../../sanity.types";

const categories = [
  { name: "Shoes", path: "/category/shoes" },
  { name: "Pullovers", path: "/category/pullovers" },
  { name: "Shirts", path: "/category/shirts" },
  { name: "Hats", path: "/category/hats" },
];

// 👇 Type des props reçues depuis le serveur
type HeaderClientProps = {
  user: { id: string } | null;
  orders: Order[]; // 👈 adapte le type si tu as une structure précise
};

const HeaderClient = ({ orders }: HeaderClientProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const wishlistCount = useWishlistStore((state) => state.count);
  const cartCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden cursor-pointer"
            onClick={toggleMobileMenu}
          >
            <Menu size={24} />
          </Button>

          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                width={50}
                height={50}
                src="/assets/logo.jpg"
                alt="Sartorial Logo"
                className="h-8 md:hidden"
              />
              <span className="hidden md:inline text-2xl font-bold tracking-tight text-brand-900">
                Sartorial
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.path}
                className="text-sm font-medium text-brand-700 hover:text-brand-900 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-brand-700 cursor-pointer"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              {searchOpen ? <X size={20} /> : <SearchIcon size={20} />}
            </Button>
            <Search show={searchOpen} onClose={() => setSearchOpen(false)} />

            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="text-brand-700 relative cursor-pointer"
              >
                <Heart size={20} />
                <span className="absolute -top-1 -right-1 bg-brand-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              </Button>
            </Link>

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-brand-700 relative cursor-pointer"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-brand-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </Button>
            </Link>

            {/* 👇 Passer les props à UserAuthSection */}
            <UserAuthSection orders={orders} />
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white animate-fade-in">
          <div className="container-custom py-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="cursor-pointer"
              >
                <X size={24} />
              </Button>
            </div>

            <nav className="flex flex-col space-y-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.path}
                  className="text-lg font-medium py-2 border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderClient;

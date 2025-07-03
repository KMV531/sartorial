"use client";

import { ClerkLoaded, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { User, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Order } from "../../sanity.types";

type UserAuthSectionProps = {
  orders: Order[]; // adapte si tu as un type précis
};

const UserAuthSection = ({ orders }: UserAuthSectionProps) => {
  const orderCount = orders?.length ?? 0;

  return (
    <ClerkLoaded>
      {/* Signed in user UI */}
      <SignedIn>
        <Link href="/orders">
          <Button
            variant="ghost"
            size="icon"
            className="text-brand-700 relative cursor-pointer"
          >
            <ShoppingBasket size={20} />
            <span className="absolute -top-1 -right-1 bg-brand-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {orderCount}
            </span>
          </Button>
        </Link>
        <UserButton />
      </SignedIn>

      {/* Signed out user UI */}
      <SignedOut>
        <Link href={"/sign-in"}>
          <Button
            variant="ghost"
            size="icon"
            className="text-brand-700 cursor-pointer"
          >
            <User size={20} />
          </Button>
        </Link>
      </SignedOut>
    </ClerkLoaded>
  );
};

export default UserAuthSection;

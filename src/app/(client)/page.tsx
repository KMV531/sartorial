import React from "react";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import { getCategory, getHero } from "@/sanity/helpers";
import FeaturedSection from "@/components/FeaturedSection";
import BestSeller from "@/components/BestSeller";
import NewArrival from "@/components/NewArrival";
import NewsLetterSection from "@/components/NewsLetterSection";

const HomePage = async () => {
  const hero = await getHero();
  const category = await getCategory();
  return (
    <div>
      <HeroSection hero={hero} />
      <CategorySection category={category} />
      <FeaturedSection />
      <BestSeller />
      <NewArrival />
      <NewsLetterSection />
    </div>
  );
};

export default HomePage;

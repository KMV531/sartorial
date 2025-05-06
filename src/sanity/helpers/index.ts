import { sanityFetch } from "../lib/live";
import {
  CATEGORY_QUERY,
  HERO_QUERY,
  LONG_SLEEVE_QUERY,
  PARTY_QUERY,
  PRODUCT_BY_SLUG,
  PRODUCT_QUERY,
  SHORT_SLEEVE_QUERY,
  TRADITIONAL_QUERY,
} from "./query";

export const getHero = async () => {
  try {
    const heroData = await sanityFetch({
      query: HERO_QUERY,
    });
    return heroData?.data || [];
  } catch (error) {
    console.error("Error fetching Hero data:", error);
    return [];
  }
};

export const getCategory = async () => {
  try {
    const CategoryData = await sanityFetch({
      query: CATEGORY_QUERY,
    });
    return CategoryData?.data || [];
  } catch (error) {
    console.error("Error fetching Category data:", error);
    return [];
  }
};

export const getProduct = async () => {
  try {
    const productData = await sanityFetch({
      query: PRODUCT_QUERY,
    });
    return productData?.data || [];
  } catch (error) {
    console.error("Error fetching Product data:", error);
    return [];
  }
};

export const getShortSleeve = async () => {
  try {
    const shortSleeve = await sanityFetch({
      query: SHORT_SLEEVE_QUERY,
    });
    return shortSleeve?.data || [];
  } catch (error) {
    console.error("Error fetching Short Sleeve products:", error);
    return [];
  }
};

export const getLongSleeve = async () => {
  try {
    const longSleeve = await sanityFetch({
      query: LONG_SLEEVE_QUERY,
    });
    return longSleeve?.data || [];
  } catch (error) {
    console.error("Error fetching Long Sleeve products:", error);
    return [];
  }
};

export const getParty = async () => {
  try {
    const party = await sanityFetch({
      query: PARTY_QUERY,
    });
    return party?.data || [];
  } catch (error) {
    console.error("Error fetching Party products:", error);
    return [];
  }
};

export const getTraditional = async () => {
  try {
    const traditional = await sanityFetch({
      query: TRADITIONAL_QUERY,
    });
    return traditional?.data || [];
  } catch (error) {
    console.error("Error fetching Traditional products:", error);
    return [];
  }
};

export const getProductSlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    console.error("Error fetching Product by Slug:", error);
    return null;
  }
};

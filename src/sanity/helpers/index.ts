import { sanityFetch } from "../lib/live";
import {
  CATEGORY_QUERY,
  HATS_QUERY,
  HERO_QUERY,
  MY_ORDERS_QUERY,
  PRODUCT_BY_SLUG,
  PRODUCT_QUERY,
  PULL_OVERS_QUERY,
  SHIRT_QUERY,
  SHOES_QUERY,
  SIMILAR_PRODUCTS_QUERY,
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

export const getShirt = async () => {
  try {
    const shirt = await sanityFetch({
      query: SHIRT_QUERY,
    });
    return shirt?.data || [];
  } catch (error) {
    console.error("Error fetching Shirts products:", error);
    return [];
  }
};

export const getPullOvers = async () => {
  try {
    const pullOvers = await sanityFetch({
      query: PULL_OVERS_QUERY,
    });
    return pullOvers?.data || [];
  } catch (error) {
    console.error("Error fetching Pullovers products:", error);
    return [];
  }
};

export const getShoes = async () => {
  try {
    const shoes = await sanityFetch({
      query: SHOES_QUERY,
    });
    return shoes?.data || [];
  } catch (error) {
    console.error("Error fetching SHoes products:", error);
    return [];
  }
};

export const getHats = async () => {
  try {
    const hats = await sanityFetch({
      query: HATS_QUERY,
    });
    return hats?.data || [];
  } catch (error) {
    console.error("Error fetching Hats products:", error);
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

export const getSimilarProducts = async ({
  categoryId,
  currentProductId,
}: {
  categoryId: string;
  currentProductId: string;
}) => {
  try {
    const similarProducts = await sanityFetch({
      query: SIMILAR_PRODUCTS_QUERY,
      params: { categoryId, currentProductId },
    });

    return similarProducts?.data || [];
  } catch (error) {
    console.error("Error fetching similar products:", error);
    return [];
  }
};

export const getMyOrders = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: {
        userId,
      },
    });
    return orders?.data || [];
  } catch (error) {
    console.error("Error fetching Orders:", error);
    return [];
  }
};

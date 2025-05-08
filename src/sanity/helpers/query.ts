import { defineQuery } from "next-sanity";

export const HERO_QUERY = defineQuery(
  `*[_type == "heroSection"] | order(name asc)`
);

export const CATEGORY_QUERY = defineQuery(
  `*[_type == "category"] | order(name asc)`
);

export const PRODUCT_QUERY = defineQuery(
  `*[_type == "product"] | order(_createdAt desc)`
);

export const SHORT_SLEEVE_QUERY = defineQuery(
  `*[_type == "product" && category->slug.current == "short-sleeve"] | order(_createdAt desc)`
);

export const LONG_SLEEVE_QUERY = defineQuery(
  `*[_type == "product" && category->slug.current == "long-sleeve"] | order(_createdAt desc)`
);

export const PARTY_QUERY = defineQuery(
  `*[_type == "product" && category->slug.current == "party"] | order(_createdAt desc)`
);

export const TRADITIONAL_QUERY = defineQuery(
  `*[_type == "product" && category->slug.current == "traditional"] | order(_createdAt desc)`
);

export const PRODUCT_BY_SLUG = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc)[0]`
);

export const SIMILAR_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && category._ref == $categoryId && _id != $currentProductId] 
  | order(_createdAt desc)[0...4] {
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    "images": images[].asset->url,
    "category": category->name,
    "categorySlug": category->slug.current,
  }
`);

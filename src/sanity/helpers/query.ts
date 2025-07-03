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

export const SHIRT_QUERY = defineQuery(
  `*[_type == "product" && category->slug.current == "shirts"] | order(_createdAt desc)`
);

export const PULL_OVERS_QUERY = defineQuery(
  `*[_type == "product" && category->slug.current == "pullovers"] | order(_createdAt desc)`
);

export const SHOES_QUERY = defineQuery(
  `*[_type == "product" && category->slug.current == "shoes"] | order(_createdAt desc)`
);

export const HATS_QUERY = defineQuery(
  `*[_type == "product" && category->slug.current == "hats"] | order(_createdAt desc)`
);

export const PRODUCT_BY_SLUG = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc)[0]`
);

export const SIMILAR_PRODUCTS_QUERY =
  defineQuery(`*[_type == "product" && category._ref == $categoryId && _id != $currentProductId] 
  | order(_createdAt desc)[0...4] {
    _id,
    name,
    slug,
    description,
    price,
    "images": images[].asset->url,
    "category": category->{
      name,
      slug
    }
  }`);

export const MY_ORDERS_QUERY = defineQuery(
  `*[_type == "order" && clerkUserId == $userId] | order(orderDate desc){
    ...,
    products[] {
      ...,
      product->
    }
  }`
);

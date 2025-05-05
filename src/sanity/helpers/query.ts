import { defineQuery } from 'next-sanity'

export const HERO_QUERY = defineQuery(
  `*[_type == "heroSection"] | order(name asc)`
)

export const CATEGORY_QUERY = defineQuery(
  `*[_type == "category"] | order(name asc)`
)

export const PRODUCT_QUERY = defineQuery(
  `*[_type == "product"] | order(_createdAt desc)`
)

import { sanityFetch } from '../lib/live'
import { CATEGORY_QUERY, HERO_QUERY, PRODUCT_QUERY } from './query'

export const getHero = async () => {
  try {
    const heroData = await sanityFetch({
      query: HERO_QUERY,
    })
    return heroData?.data || []
  } catch (error) {
    console.error('Error fetching Hero data:', error)
    return []
  }
}

export const getCategory = async () => {
  try {
    const CategoryData = await sanityFetch({
      query: CATEGORY_QUERY,
    })
    return CategoryData?.data || []
  } catch (error) {
    console.error('Error fetching Category data:', error)
    return []
  }
}

export const getProduct = async () => {
  try {
    const productData = await sanityFetch({
      query: PRODUCT_QUERY,
    })
    return productData?.data || []
  } catch (error) {
    console.error('Error fetching Product data:', error)
    return []
  }
}

import { type SchemaTypeDefinition } from 'sanity'

import { categoryType } from './categoryType'
import { heroType } from './heroType'
import { productType } from './productType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, heroType, productType],
}

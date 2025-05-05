import { PackageIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Base Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "variants",
      title: "Variants",
      type: "array",
      of: [
        {
          name: "variant",
          title: "Variant",
          type: "object",
          fields: [
            defineField({
              name: "variantId",
              title: "Variant ID",
              type: "string",
              initialValue: () => crypto.randomUUID(),
            }),
            defineField({
              name: "size",
              title: "Size",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "color",
              title: "Color",
              type: "object",
              fields: [
                defineField({
                  name: "name",
                  title: "Color Name",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "value",
                  title: "Color Value",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
            defineField({
              name: "stock",
              title: "Stock",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "price",
              title: "Variant Price",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "bestSeller",
      title: "Best Seller",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "newArrival",
      title: "New Arrival",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        {
          name: "review",
          title: "Review",
          type: "object",
          fields: [
            defineField({
              name: "user",
              title: "User",
              type: "object",
              fields: [
                defineField({
                  name: "name",
                  title: "User Name",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
            defineField({
              name: "rating",
              title: "Rating",
              type: "number",
              validation: (Rule) => Rule.required().min(0).max(5),
            }),
            defineField({
              name: "comment",
              title: "Comment",
              type: "text",
            }),
            defineField({
              name: "date",
              title: "Review Date",
              type: "date",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "description",
      media: "images.0.asset",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle,
        media: selection.media,
      };
    },
  },
});

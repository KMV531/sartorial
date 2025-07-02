// sanity/schema/order.ts
import { defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "transactionId",
      title: "Transaction ID",
      type: "string",
    }),
    defineField({
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: {
        list: ["pending", "completed", "failed"],
      },
    }),
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: ["mobile", "card", "bank"],
      },
    }),
    defineField({
      name: "amount",
      title: "Amount",
      type: "number",
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
    }),
    defineField({
      name: "customer",
      title: "Customer",
      type: "object",
      fields: [
        defineField({ name: "name", type: "string" }),
        defineField({ name: "email", type: "string" }),
        defineField({ name: "phone", type: "string" }),
        defineField({ name: "address", type: "text" }),
      ],
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "product",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({ name: "quantity", type: "number" }),
            defineField({ name: "price", type: "number" }),
            defineField({ name: "size", type: "string" }),
            defineField({
              name: "color",
              type: "object",
              fields: [
                defineField({ name: "name", type: "string" }),
                defineField({ name: "value", type: "string" }),
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    }),

    defineField({
      name: "bankDetails",
      title: "Bank Details",
      type: "object",
      fields: [
        defineField({ name: "accountNumber", type: "string" }),
        defineField({ name: "bankName", type: "string" }),
      ],
      hidden: ({ parent }) => parent?.paymentMethod !== "bank",
    }),
  ],
});

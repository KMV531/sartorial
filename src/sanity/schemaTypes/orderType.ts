// /schemas/order.ts

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
      name: "transactionRef",
      title: "Merchant Transaction Reference",
      type: "string",
    }),
    defineField({
      name: "partnerTransactionId",
      title: "Partner Transaction ID",
      type: "string",
    }),
    defineField({
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
    }),
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
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
    {
      name: "customer",
      title: "Customer Info",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Name",
          type: "string",
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
        }),
        defineField({
          name: "address",
          title: "Address",
          type: "string",
        }),
        defineField({
          name: "phone",
          title: "Phone",
          type: "string",
        }),
        // Add other custom fields as needed
      ],
    },
    defineField({
      name: "payerName",
      title: "Payer Name",
      type: "string",
    }),
    defineField({
      name: "payerAccountId",
      title: "Payer Account ID",
      type: "string",
    }),
    defineField({
      name: "payerUserId",
      title: "Payer User ID",
      type: "string",
    }),
    defineField({
      name: "payerNote",
      title: "Payer Note",
      type: "string",
    }),
    defineField({
      name: "transactionTime",
      title: "Transaction Time",
      type: "datetime",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    }),
    defineField({
      name: "merchantAccountId",
      title: "Merchant Account ID",
      type: "string",
    }),
    defineField({
      name: "merchantFee",
      title: "Merchant Fee",
      type: "number",
    }),
    defineField({
      name: "netAmountReceived",
      title: "Net Amount Received",
      type: "number",
    }),
    defineField({
      name: "receivingEntity",
      title: "Receiving Entity Name",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Ordered Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "number",
            }),
            defineField({
              name: "size",
              title: "Size",
              type: "string",
            }),
            defineField({
              name: "color",
              title: "Color",
              type: "object",
              fields: [
                { name: "name", title: "Name", type: "string" },
                { name: "value", title: "Value", type: "string" },
              ],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "transactionId",
      subtitle: "transactionRef",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle,
      };
    },
  },
});

/* 
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

*/

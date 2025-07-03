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
      name: "resourceId",
      title: "Resource ID",
      type: "string",
    }),
    defineField({
      name: "partnerTransactionId",
      title: "Partner Transaction ID",
      type: "string",
    }),
    defineField({
      name: "clerkUserId",
      title: "Clerk User ID",
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
          title: "Delivery Address",
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
              name: "productImage",
              title: "Product Image",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "name",
              title: "Product Name",
              type: "string",
            }),
            defineField({
              name: "variantId",
              title: "Variant ID",
              type: "string",
            }),
            defineField({
              name: "price",
              title: "Variant Price",
              type: "number",
            }),
            defineField({
              name: "quantity",
              title: "Quantity",
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
              fields: [{ name: "name", title: "Name", type: "string" }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          {
            title: "Pending",
            value: "pending",
          },
          {
            title: "Paid",
            value: "paid",
          },
          {
            title: "Shipped",
            value: "shipped",
          },
          {
            title: "Delivered",
            value: "delivered",
          },
          {
            title: "Cancelled",
            value: "cancelled",
          },
        ],
      },
      initialValue: "pending", // optional: sets default to 'pending' on order creation
    }),
  ],
  preview: {
    select: {
      title: "transactionRef",
      subtitle: "clerkUserId",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `User ID: ${selection.subtitle}`,
      };
    },
  },
});

import { writeClient } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

type CartItem = {
  productId: string;
  quantity: number;
  price: number;
  size?: string;
  color?: {
    name?: string;
  };
  selectedSize?: string;
  selectedColor?: {
    name?: string;
  };
};

type WebhookPayload = {
  eventType: string;
  resource: {
    requestId: string; // resourceId
    status: string;
    amount: number;
    currencyCode: string;
    transactionStatus?: string;
    createdAt: string;
    transactionTime?: string;
    transactionId?: string;
    mchTransactionRef?: string;
    partnerTransactionId?: string;
    payerNote?: string;
    serviceDiscountAmount?: number;
    receivingEntityName?: string;
    transactionTag?: string;
    appId?: string;
    payer?: {
      userId?: string;
      name?: string;
      paymentMethod?: string;
      countryCode?: string;
      accountId?: string;
      accountName?: string;
      email?: string;
      amount?: number;
      netAmountPaid?: number;
    };
    merchant?: {
      accountId?: string;
      amount?: number;
      fee?: number;
      netAmountReceived?: number;
    };
  };
  cartItems?: CartItem[];
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
};

export async function POST(request: Request) {
  try {
    const payload: WebhookPayload = await request.json();

    console.log(
      "✅ Received webhook payload:",
      JSON.stringify(payload, null, 2)
    );

    if (
      payload.eventType === "REQUEST.COMPLETED" &&
      payload.resource.status === "SUCCESSFUL"
    ) {
      const resourceId = payload.resource.requestId;

      if (!resourceId) {
        console.error("❌ Missing requestId (resourceId) in webhook payload");
        return NextResponse.json(
          { error: "Missing requestId (resourceId)" },
          { status: 400 }
        );
      }

      // Find order in Sanity by resourceId:
      const existingOrders = await writeClient.fetch(
        `*[_type == "order" && resourceId == $resourceId]`,
        { resourceId }
      );
      if (existingOrders.length === 0) {
        console.warn("❌ Order not found for resourceId:", resourceId);
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      const orderId = existingOrders[0]._id;

      // PATCH: update all except customer and items
      await writeClient
        .patch(orderId)
        .set({
          transactionId: payload.resource.transactionId,
          partnerTransactionId: payload.resource.partnerTransactionId,
          paymentStatus: "completed",
          paymentMethod: payload.resource.payer?.paymentMethod,
          amount: payload.resource.amount,
          currency: payload.resource.currencyCode,
          // CUSTOMER INFO left untouched here
          // ITEMS left untouched here
          payerName: payload.resource.payer?.name || "",
          payerAccountId: payload.resource.payer?.accountId || "",
          payerUserId: payload.resource.payer?.userId || "",
          payerNote: payload.resource.payerNote || "",
          transactionTime: payload.resource.transactionTime || "",
          merchantAccountId: payload.resource.merchant?.accountId || "",
          merchantFee: payload.resource.merchant?.fee || 0,
          netAmountReceived: payload.resource.merchant?.netAmountReceived || 0,
          receivingEntity: payload.resource.receivingEntityName || "",
        })
        .commit();

      console.log(
        "✅ Order updated successfully (except customer & items):",
        orderId
      );

      return NextResponse.json({ success: true });
    }

    console.log("📭 Webhook event type not handled:", payload.eventType);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("🚨 Webhook processing error:", error);
    let errorMessage = "Internal server error";
    if (error instanceof Error) errorMessage = error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/* 
import { writeClient } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

type CartItem = {
  productId: string;
  quantity: number;
  price: number;
  size?: string;
  color?: {
    name?: string;
  };
  selectedSize?: string;
  selectedColor?: {
    name?: string;
  };
};

type WebhookPayload = {
  eventType: string;
  resource: {
    requestId: string; // This is resourceId
    status: string;
    amount: number;
    currencyCode: string;
    transactionStatus?: string;
    createdAt: string;
    transactionTime?: string;
    transactionId?: string;
    mchTransactionRef?: string;
    partnerTransactionId?: string;
    payerNote?: string;
    serviceDiscountAmount?: number;
    receivingEntityName?: string;
    transactionTag?: string;
    appId?: string;
    payer?: {
      userId?: string;
      name?: string;
      paymentMethod?: string;
      countryCode?: string;
      accountId?: string;
      accountName?: string;
      email?: string;
      amount?: number;
      netAmountPaid?: number;
    };
    merchant?: {
      accountId?: string;
      amount?: number;
      fee?: number;
      netAmountReceived?: number;
    };
  };
  cartItems?: CartItem[];
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
};

type ProductVariant = {
  name: string;
  price: number;
};

async function getProductInfo(productId: string) {
  const query = `*[_type=="product" && _id == $id][0]{
    name,
    category->{title},
    variants[]{
      name,
      price
    }
  }`;
  return await writeClient.fetch(query, { id: productId });
}

export async function POST(request: Request) {
  try {
    const payload: WebhookPayload = await request.json();

    console.log(
      "✅ Received webhook payload:",
      JSON.stringify(payload, null, 2)
    );

    if (
      payload.eventType === "REQUEST.COMPLETED" &&
      payload.resource.status === "SUCCESSFUL"
    ) {
      const resourceId = payload.resource.requestId;

      if (!resourceId) {
        console.error("❌ Missing requestId (resourceId) in webhook payload");
        return NextResponse.json(
          { error: "Missing requestId (resourceId)" },
          { status: 400 }
        );
      }

      // Find order in Sanity by resourceId:
      const existingOrders = await writeClient.fetch(
        `*[_type == "order" && resourceId == $resourceId]`,
        { resourceId }
      );
      if (existingOrders.length === 0) {
        console.warn("❌ Order not found for resourceId:", resourceId);
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      const orderId = existingOrders[0]._id;

      const items = Array.isArray(payload.cartItems) ? payload.cartItems : [];

      // Prepare simplified items with product info fetched from Sanity
      const simplifiedItems = [];
      for (const item of items) {
        const productInfo = await getProductInfo(item.productId);

        simplifiedItems.push({
          _key: item.productId,
          product: {
            _type: "object",
            name: productInfo?.name || "Unknown product",
            category: productInfo?.category?.title || "",
            price: productInfo?.variants?.[0]?.price || 0,
            variants:
              productInfo?.variants?.map((v: ProductVariant) => ({
                name: v.name,
                price: v.price,
              })) || [],
          },
          quantity: item.quantity,
          size: item.size || item.selectedSize || "",
          color: item.color || item.selectedColor || null,
        });
      }

      // Patch (update) the existing order with full info
      await writeClient
        .patch(orderId)
        .set({
          transactionId: payload.resource.transactionId,
          partnerTransactionId: payload.resource.partnerTransactionId,
          paymentStatus: "completed",
          paymentMethod: payload.resource.payer?.paymentMethod,
          amount: payload.resource.amount,
          currency: payload.resource.currencyCode,
          customer: {
            name: payload.customer?.name || "",
            email: payload.customer?.email || "",
            phone: payload.customer?.phone || "",
            address: payload.customer?.address || "",
          },
          payerName: payload.resource.payer?.name || "",
          payerAccountId: payload.resource.payer?.accountId || "",
          payerUserId: payload.resource.payer?.userId || "",
          payerNote: payload.resource.payerNote || "",
          transactionTime: payload.resource.transactionTime || "",
          merchantAccountId: payload.resource.merchant?.accountId || "",
          merchantFee: payload.resource.merchant?.fee || 0,
          netAmountReceived: payload.resource.merchant?.netAmountReceived || 0,
          receivingEntity: payload.resource.receivingEntityName || "",
          items: simplifiedItems,
        })
        .commit();

      console.log("✅ Order updated successfully:", orderId);

      return NextResponse.json({ success: true });
    }

    console.log("📭 Webhook event type not handled:", payload.eventType);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("🚨 Webhook processing error:", error);
    let errorMessage = "Internal server error";
    if (error instanceof Error) errorMessage = error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
*/

/* ======================================================================================== */

/* 
import { writeClient } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

// Define types for the webhook payload
type CartItem = {
  productId: string;
  quantity: number;
  price: number;
  size?: string;
  color?: {
    name?: string;
  };
  selectedSize?: string;
  selectedColor?: {
    name?: string;
  };
};

type WebhookPayload = {
  eventType: string;
  resource: {
    requestId: string;
    status: string;
    amount: number;
    currencyCode: string;
    transactionStatus?: string;
    createdAt: string;
    transactionTime?: string;
    transactionId?: string;
    mchTransactionRef?: string;
    partnerTransactionId?: string;
    payerNote?: string;
    serviceDiscountAmount?: number;
    receivingEntityName?: string;
    transactionTag?: string;
    appId?: string;
    payer?: {
      userId?: string;
      name?: string;
      paymentMethod?: string;
      countryCode?: string;
      accountId?: string;
      accountName?: string;
      email?: string;
      amount?: number;
      netAmountPaid?: number;
    };
    merchant?: {
      accountId?: string;
      amount?: number;
      fee?: number;
      netAmountReceived?: number;
    };
  };
  cartItems?: CartItem[];
  customer?: Record<string, unknown>;
};

export async function POST(request: Request) {
  try {
    const payload: WebhookPayload = await request.json();
    console.log("✅ Full webhook payload:", JSON.stringify(payload, null, 2));

    if (payload.eventType === "REQUEST.COMPLETED") {
      const status = payload.resource.status;

      if (status === "SUCCESSFUL") {
        const items = Array.isArray(payload.cartItems) ? payload.cartItems : [];

        await writeClient.create({
          _type: "order",
          transactionId: payload.resource.transactionId,
          transactionRef: payload.resource.mchTransactionRef,
          partnerTransactionId: payload.resource.partnerTransactionId,
          paymentStatus: "completed",
          paymentMethod: payload.resource.payer?.paymentMethod,
          amount: payload.resource.amount,
          currency: payload.resource.currencyCode,
          customer: {
            name: (payload.customer?.name as string) || "",
            email: (payload.customer?.email as string) || "",
            phone: (payload.customer?.phone as string) || "",
            address: (payload.customer?.address as string) || "",
          },
          payerName: payload.resource.payer?.name,
          payerAccountId: payload.resource.payer?.accountId,
          payerUserId: payload.resource.payer?.userId,
          payerNote: payload.resource.payerNote,
          transactionTime: payload.resource.transactionTime,
          createdAt: payload.resource.createdAt,
          merchantAccountId: payload.resource.merchant?.accountId,
          merchantFee: payload.resource.merchant?.fee,
          netAmountReceived: payload.resource.merchant?.netAmountReceived,
          receivingEntity: payload.resource.receivingEntityName,

          items: items.map((item) => ({
            _key: item.productId,
            product: { _type: "reference", _ref: item.productId },
            quantity: item.quantity,
            price: item.price,
            size: item.size || item.selectedSize || "",
            color: item.color || item.selectedColor || null,
          })),
        });
      } else {
        console.warn("❌ Payment not successful:", status);
      }
    } else {
      console.log("📭 Event type not handled:", payload.eventType);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("🚨 Webhook Error", error);
    let errorMessage = "Internal server error";
    if (error instanceof Error) errorMessage = error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

*/

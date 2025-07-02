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
    value?: string;
  };
  selectedSize?: string;
  selectedColor?: {
    name?: string;
    value?: string;
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
    value?: string;
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
          customer: payload.customer,
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
            ...(item.size && { size: item.size }),
            ...(item.color && { color: item.color }),
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

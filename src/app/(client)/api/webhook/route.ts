import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";

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
    transferId: string;
    amount: number;
    currencyCode: string;
  };
  paymentMethod?: string;
  customer?: Record<string, unknown>;
  cartItems: CartItem[];
};

export async function POST(request: Request) {
  try {
    const expectedAuthKey = process.env.TRANZAK_WEBHOOK_AUTH_KEY;

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || authHeader !== `Bearer ${expectedAuthKey}`) {
      console.error("❌ Unauthorized webhook request");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload: WebhookPayload = await request.json();
    console.log("✅ Full webhook payload:", JSON.stringify(payload, null, 2));

    if (payload.eventType === "REQUEST.COMPLETED") {
      console.log("REQUEST.COMPLETED received");

      await writeClient.create({
        _type: "order",
        transactionId: payload.resource.transferId,
        paymentStatus: "completed",
        paymentMethod: payload.paymentMethod,
        amount: payload.resource.amount,
        currency: payload.resource.currencyCode,
        customer: payload.customer,
        items: payload.cartItems.map((item) => ({
          _key: item.productId,
          product: { _type: "reference", _ref: item.productId },
          quantity: item.quantity,
          price: item.price,
          ...(item.size && { size: item.size }),
          ...(item.color && { color: item.color }),
        })),
        createdAt: new Date().toISOString(),
      });
    } else {
      console.log("📭 Event type not handled", payload.eventType);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("🚨 Webhook Error", error);

    let errorMessage = "Internal server error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/* 
import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";

export async function POST(request: Request) {
  try {
    const expectedAuthKey = process.env.TRANZAK_WEBHOOK_AUTH_KEY;

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || authHeader !== `Bearer ${expectedAuthKey}`) {
      console.error("❌ Unauthorized webhook request");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await request.json();
    console.log(
      "✅ Incoming Webhook Payload",
      JSON.stringify(payload, null, 2)
    );

    if (payload.eventType === "TRANSFER.COMPLETED") {
      console.log("TRANSFER.COMPLETED received");

      await writeClient.create({
        _type: "order",
        transactionId: payload.resource.transferId,
        paymentStatus: "completed",
        paymentMethod: payload.paymentMethod,
        amount: payload.resource.amount,
        currency: payload.resource.currencyCode,
        customer: payload.customer,
        items: payload.cartItems.map((item: any) => ({
          _key: item.productId,
          product: { _type: "reference", _ref: item.productId },
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          color: item.color,
        })),
        createdAt: new Date().toISOString(),
      });
    } else {
      console.log("📭 Event type not handled", payload.eventType);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("🚨 Webhook Error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
*/

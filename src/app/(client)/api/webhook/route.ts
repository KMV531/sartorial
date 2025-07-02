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
    transferId: string;
    amount: number;
    currencyCode: string;
    status?: string; // added status here
  };
  paymentMethod?: string;
  customer?: Record<string, unknown>;
  cartItems: CartItem[];
};

export async function POST(request: Request) {
  try {
    // No Authorization check here — webhook endpoint is public

    const payload: WebhookPayload = await request.json();
    console.log("✅ Full webhook payload:", JSON.stringify(payload, null, 2));

    if (payload.eventType === "REQUEST.COMPLETED") {
      const status = payload.resource.status;
      console.log("🟡 Transaction status:", status);

      if (status === "SUCCESSFUL") {
        // Save order in Sanity only if payment is successful
        const items = Array.isArray(payload.cartItems) ? payload.cartItems : [];
        await writeClient.create({
          _type: "order",
          transactionId: payload.resource.transferId,
          paymentStatus: "completed",
          paymentMethod: payload.paymentMethod,
          amount: payload.resource.amount,
          currency: payload.resource.currencyCode,
          customer: payload.customer,
          items: items.map((item) => ({
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

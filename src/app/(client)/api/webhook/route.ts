import { writeClient } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

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
          status: "paid", // update the new status accordingly
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

import { NextResponse } from "next/server";
import { getTranzakToken } from "@/lib/tranzak-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("✅ Incoming request body:", JSON.stringify(body, null, 2));

    const token = await getTranzakToken();
    console.log("🔐 Retrieved Tranzak token");

    const paymentPayload = {
      amount: body.totalAmount,
      currencyCode: "XAF",
      description: body.description || "Achat sur Sartorial",
      payerNote: `Commande Sartorial - ${body.customerName || "Client inconnu"}`,
      customer: body.customer,
      cartItems: body.cartItems,
      mchTransactionRef: `ORD-${Date.now()}`,
      returnUrl: `${process.env.NEXT_PUBLIC_URL}/payment-success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_URL}/cart`,
      callbackUrl: `${process.env.NEXT_PUBLIC_MERCHANT_URL}/api/webhook`,
      receivingEntityName: "Sartorial Cameroun",
      transactionTag: `client-${body.phone || "N/A"}`,
      serviceDiscountAmount: body.discountAmount || 0,
      customization: {
        title: "Sartorial - Paiement sécurisé",
        logoUrl: `${process.env.NEXT_PUBLIC_URL}/assets/logo.jpg`,
      },
      mobileWalletNumber:
        body.paymentMethod === "mobile" ? body.phone : undefined,
      bankAccountNumber:
        body.paymentMethod === "bank"
          ? body.bankDetails.accountNumber
          : undefined,
      bankCode:
        body.paymentMethod === "bank" ? body.bankDetails.bankCode : undefined,
      paymentChannel:
        body.paymentMethod === "mobile"
          ? "MWALLET"
          : body.paymentMethod === "card"
            ? "CARD"
            : "BANK",
    };

    console.log("📦 Payment payload:", JSON.stringify(paymentPayload, null, 2));

    const tranzakUrl = `${process.env.TRANZAK_BASE_URL}/xp021/v1/request/create`;
    console.log("🔗 Tranzak request URL:", tranzakUrl);

    const response = await fetch(tranzakUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-App-ID": process.env.TRANZAK_APP_ID || "",
      },
      body: JSON.stringify(paymentPayload),
    });

    const data = await response.json();
    console.log("📨 Tranzak response:", JSON.stringify(data, null, 2));

    if (!data.success) {
      console.error("❌ Tranzak reported failure:", data.errorMsg);
      return NextResponse.json(
        { error: data.errorMsg || "Payment failed" },
        { status: 400 }
      );
    }

    const redirectUrl =
      data?.data?.redirectUrl ||
      data?.data?.paymentUrl ||
      data?.data?.links?.paymentAuthUrl;

    if (!redirectUrl) {
      console.error("⚠️ No redirect URL found in Tranzak response.");
      return NextResponse.json(
        { error: "No redirect URL provided by Tranzak", data: data.data },
        { status: 500 }
      );
    }

    console.log("🔁 Redirecting to payment URL:", redirectUrl);

    return NextResponse.json({
      paymentUrl: redirectUrl,
      requestId: data.data.requestId,
    });
  } catch (error: unknown) {
    console.error("🚨 Initiate payment error:", error);

    // Type-safe error handling
    let errorMessage = "Internal Server Error";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else if (error && typeof error === "object" && "message" in error) {
      errorMessage = String(error.message);
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

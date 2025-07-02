import { NextResponse } from "next/server";
import { getTranzakToken } from "@/lib/tranzak-utils";
import { writeClient } from "@/sanity/lib/client";

type CartItem = {
  productId: string;
  quantity: number;
  price: number;
  selectedSize?: string;
  selectedColor?: { name?: string; value?: string } | null;
};

type Customer = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
};

type RequestBody = {
  totalAmount: number;
  customer?: Customer;
  cartItems: CartItem[];
  customerName?: string;
  description?: string;
  phone?: string;
  discountAmount?: number;
  paymentMethod?: "mobile" | "bank" | "card";
  bankDetails?: { accountNumber?: string; bankCode?: string };
};

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    console.log("✅ Incoming request body:", JSON.stringify(body, null, 2));

    // Create a pending order in Sanity
    await writeClient.create({
      _type: "order",
      paymentStatus: "pending",
      amount: body.totalAmount,
      currency: "XAF",
      customer: {
        name: body.customer?.name || "",
        email: body.customer?.email || "",
        phone: body.customer?.phone || "",
        address: body.customer?.address || "",
      },
      items: body.cartItems.map((item) => ({
        _key: item.productId,
        product: { _type: "reference", _ref: item.productId },
        quantity: item.quantity,
        price: item.price,
        size: item.selectedSize || "",
        color: item.selectedColor || null,
      })),
      payerNote: `Commande Sartorial - ${body.customerName || "Client inconnu"}`,
      createdAt: new Date().toISOString(),
    });

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
          ? body.bankDetails?.accountNumber
          : undefined,
      bankCode:
        body.paymentMethod === "bank" ? body.bankDetails?.bankCode : undefined,
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

/* 
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
*/

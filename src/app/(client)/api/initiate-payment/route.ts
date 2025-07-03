import { NextResponse } from "next/server";
import { getTranzakToken } from "@/lib/tranzak-utils";
import { writeClient } from "@/sanity/lib/client";

type CartItem = {
  productId: string;
  variantId: string;
  name: string;
  price: number;
  quantity: number;
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

    const transactionRef = `ORDER-${Date.now()}`;
    const token = await getTranzakToken();

    const paymentPayload = {
      amount: body.totalAmount,
      currencyCode: "XAF",
      description: body.description || "Achat sur Sartorial",
      payerNote: `Commande Sartorial - ${body.customerName || "Client inconnu"}`,
      customer: body.customer,
      cartItems: body.cartItems,
      mchTransactionRef: transactionRef,
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

    const response = await fetch(
      `${process.env.TRANZAK_BASE_URL}/xp021/v1/request/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-App-ID": process.env.TRANZAK_APP_ID || "",
        },
        body: JSON.stringify(paymentPayload),
      }
    );

    const data = await response.json();

    const redirectUrl =
      data?.data?.redirectUrl ||
      data?.data?.paymentUrl ||
      data?.data?.links?.paymentAuthUrl;

    if (!redirectUrl) {
      return NextResponse.json(
        { error: "No redirect URL from Tranzak" },
        { status: 500 }
      );
    }

    // Save pending order to Sanity
    await writeClient.create({
      _type: "order",
      transactionRef,
      resourceId: data.data.requestId,
      paymentStatus: "pending",
      amount: body.totalAmount,
      currency: "XAF",
      paymentMethod: body.paymentMethod || "unknown",
      customer: {
        name: body.customer?.name || "",
        email: body.customer?.email || "",
        phone: body.customer?.phone || "",
        address: body.customer?.address || "",
      },
      items: body.cartItems.map((item) => ({
        _key: `${item.productId}-${item.variantId}`,
        product: { _type: "reference", _ref: item.productId },
        name: item.name,
        variantId: item.variantId,
        price: item.price,
        quantity: item.quantity,
        size: item.selectedSize || "",
        color: item.selectedColor?.name ? item.selectedColor : null,
      })),
      payerNote: `Commande Sartorial - ${body.customerName || "Client inconnu"}`,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      paymentUrl: redirectUrl,
      requestId: data.data.requestId,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

interface TokenResponse {
  data: {
    token: string;
    expiresIn: number;
    scope: string;
    appId: string;
  };
  success: boolean;
  errorMsg?: string;
}

export async function getTranzakToken(): Promise<string> {
  // Verify credentials before making the request
  if (!process.env.TRANZAK_APP_ID || !process.env.TRANZAK_APP_KEY) {
    throw new Error("Missing Tranzak credentials in environment variables");
  }

  // Validate key format
  const validPrefix =
    process.env.TRANZAK_APP_KEY.startsWith("SAND_") ||
    process.env.TRANZAK_APP_KEY.startsWith("PROD_");

  if (!validPrefix) {
    throw new Error("App Key must start with SAND_ or PROD_");
  }

  try {
    const response = await fetch(`${process.env.TRANZAK_BASE_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        appId: process.env.TRANZAK_APP_ID,
        appKey: process.env.TRANZAK_APP_KEY,
      }),
    });

    const data: TokenResponse = await response.json();

    if (!data.success) {
      console.error("Auth Error:", {
        status: response.status,
        error: data.errorMsg || "Unknown error",
        appId: process.env.TRANZAK_APP_ID,
        keyPrefix: process.env.TRANZAK_APP_KEY,
      });
      throw new Error(data.errorMsg || "Authentication failed");
    }

    return data.data.token;
  } catch (error) {
    console.error("Token generation failed:", error);
    throw new Error("Could not connect to authentication service");
  }
}

import { algoliasearch } from "algoliasearch";
import { client } from "@/sanity/lib/client";
import { PRODUCT_QUERYResult } from "../../../../../sanity.types";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const algoliaApiKey = process.env.ALGOLIA_API_KEY!;
const indexName = process.env.ALGOLIA_INDEX_NAME!;
const webhookSecret = process.env.SANITY_WEBHOOK_SECRET!;

const algoliaClient = algoliasearch(algoliaAppId, algoliaApiKey);

// Function to perform initial indexing
async function performInitialIndexing() {
  console.log("Starting initial indexing...");

  // Fetch all products from Sanity
  const sanityData = await client.fetch(`*[_type == "product"]{
    _id,
    name,
    "slug": slug.current,
    description,
    price,
    "category": category->name,
    "categorySlug": category->slug.current,
    "images": images[].asset->url, // Dereference the image asset to get the URL
    "variants": variants[]{
      variantId,
      size,
      color {
        name,
        value
      },
      stock,
      price
    },
    featured,
    bestSeller,
    newArrival,
    rating,
    "reviews": reviews[] {
      user {
        name
      },
      rating,
      comment,
      date
    },
    _createdAt,
    _updatedAt
  }`);

  const records = sanityData.map((doc: PRODUCT_QUERYResult[0]) => ({
    objectID: doc._id,
    name: doc.name,
    slug: doc.slug?.current, // Using optional chaining because slug may be undefined
    description: doc.description,
    price: doc.price,
    category: doc.category ? doc.category._ref : null, // Handling category reference
    categorySlug: doc.category ? doc.category._ref : null, // You can adjust this field as needed
    images: doc.images || [], // Ensure we handle undefined images safely
    variants: doc.variants || [], // Handle variants
    featured: doc.featured || false, // Default to false if undefined
    bestSeller: doc.bestSeller || false,
    newArrival: doc.newArrival || false,
    rating: doc.rating || 0, // Default to 0 if undefined
    reviews: doc.reviews || [], // Handle empty reviews array
    _createdAt: doc._createdAt,
    _updatedAt: doc._updatedAt,
  }));

  // Save all records to Algolia
  await algoliaClient.saveObjects({
    indexName,
    objects: records,
  });

  console.log("Initial indexing completed.");
  return {
    message: "Successfully completed initial indexing!",
  };
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const initialIndex = searchParams.get("initialIndex") === "true";

    if (initialIndex) {
      const response = await performInitialIndexing();
      return Response.json(response);
    }

    // Validate webhook signature
    const signature = request.headers.get(SIGNATURE_HEADER_NAME);
    if (!signature) {
      return Response.json(
        { success: false, message: "Missing signature header" },
        { status: 401 }
      );
    }

    // Get request body for signature validation
    const body = await request.text();
    const isValid = await isValidSignature(body, signature, webhookSecret);

    if (!isValid) {
      return Response.json(
        { success: false, message: "Invalid signature" },
        { status: 401 }
      );
    }

    let payload;
    try {
      payload = JSON.parse(body);
      console.log("Parsed Payload:", JSON.stringify(payload));
    } catch (jsonError) {
      console.warn("No JSON payload provided");
      return Response.json(
        { error: "No payload provided:", jsonError },
        { status: 400 }
      );
    }

    const { _id, operation, value } = payload;

    if (!operation || !_id || !value) {
      return Response.json(
        { error: "Invalid payload, missing required fields" },
        { status: 400 }
      );
    }

    if (operation === "delete") {
      await algoliaClient.deleteObject({
        indexName,
        objectID: _id,
      });
      console.log(`Deleted object with ID: ${_id}`);
      return Response.json({
        message: `Successfully deleted object with ID: ${_id}`,
      });
    } else {
      // Add or update the document in Algolia
      const updatedDoc = {
        objectID: value._id,
        name: value.name,
        slug: value.slug?.current,
        description: value.description,
        price: value.price,
        category: value.category?.name || null,
        categorySlug: value.category?.slug?.current || null,
        images:
          value.images?.map(
            (img: { asset?: { url?: string } }) => img.asset?.url
          ) || [], // Proper type for images
        variants: value.variants || [],
        featured: value.featured,
        bestSeller: value.bestSeller,
        newArrival: value.newArrival,
        rating: value.rating,
        reviews: value.reviews || [],
        _createdAt: value._createdAt,
        _updatedAt: value._updatedAt,
      };

      await algoliaClient.saveObject({
        indexName,
        body: updatedDoc,
      });

      console.log(`Indexed/Updated object with ID: ${_id}`);
      return Response.json({
        message: `Successfully processed document with ID: ${_id}`,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      // Type guard to check if error is an instance of Error
      console.error("Error indexing objects:", error.message);
      return Response.json(
        { error: "Error indexing objects", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unexpected error:", error);
      return Response.json(
        { error: "Unexpected error", details: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}

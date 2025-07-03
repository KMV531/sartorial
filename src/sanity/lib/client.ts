import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: {
    studioUrl:
      process.env.NODE_ENV === "production"
        ? "https://sartorial-alpha.vercel.app"
        : `${process.env.NEXT_PUBLIC_URL}/dashboard`,
  },
});

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: process.env.SANITY_API_WRITE_TOKEN,
});

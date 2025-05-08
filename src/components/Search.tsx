"use client";

import { liteClient as algoliasearch } from "algoliasearch/lite";
import { SearchBox, Hits } from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
);

const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!;

type SearchProps = {
  show: boolean;
};

export function Search({ show }: SearchProps) {
  const [results, setResults] = useState("");

  if (!show) return null;

  return (
    <div className="absolute left-0 right-0 top-full bg-white shadow-md z-40">
      <div className="container-custom py-4">
        <InstantSearchNext
          indexName={indexName}
          searchClient={searchClient}
          initialUiState={{ [indexName]: { query: "" } }}
          onStateChange={({ uiState }) => {
            setResults(uiState[indexName]?.query || "");
          }}
        >
          <SearchBox
            placeholder="Search for products..."
            classNames={{
              input: "border p-2 rounded border-gray-300 w-full",
              submit: "hidden",
              reset: "hidden",
            }}
          />

          {results && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">
                Results for: {results}
              </h2>
              <Hits
                hitComponent={({ hit }) => (
                  <Link
                    href={`/product/${hit.slug}`}
                    className="flex items-center space-x-4 mb-4 p-4 border rounded hover:bg-gray-50"
                  >
                    {hit.images?.[0] && (
                      <Image
                        src={hit.images[0]}
                        alt={hit.name}
                        width={100}
                        height={100}
                        className="object-cover rounded"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-bold">{hit.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {hit.description}
                      </p>
                    </div>
                  </Link>
                )}
              />
            </div>
          )}
        </InstantSearchNext>
      </div>
    </div>
  );
}

"use client";

import { liteClient as algoliasearch } from "algoliasearch/lite";
import {
  SearchBox,
  Hits,
  Highlight,
  useSearchBox,
  useHits,
} from "react-instantsearch";
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
  onClose: () => void;
};

function CustomResults({ onCloseAndReset }: { onCloseAndReset: () => void }) {
  const { hits } = useHits();

  if (!hits.length) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>No products found. Try another search.</p>
      </div>
    );
  }

  return (
    <div>
      <Hits
        hitComponent={({ hit }) => (
          <Link
            href={`/product/${hit.slug}`}
            onClick={() => {
              onCloseAndReset();
            }}
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
              <h3 className="text-lg font-bold">
                <Highlight attribute="name" hit={hit} />
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                <Highlight attribute="description" hit={hit} />
              </p>
            </div>
          </Link>
        )}
      />
    </div>
  );
}

function SearchContent({
  query,
  setQuery,
  onClose,
}: {
  query: string;
  setQuery: (q: string) => void;
  onClose: () => void;
}) {
  const { refine } = useSearchBox();

  const handleCloseAndReset = () => {
    refine(""); // Clear the search input
    setQuery(""); // Clear local state
    onClose(); // Close the search panel
  };

  return (
    <>
      <SearchBox
        placeholder="Search for products..."
        classNames={{
          input: "border p-2 rounded border-gray-300 w-full",
          submit: "hidden",
          reset: "hidden",
        }}
      />

      {query && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Results for: <span className="text-brand-700">{query}</span>
          </h2>
          <CustomResults onCloseAndReset={handleCloseAndReset} />
        </div>
      )}
    </>
  );
}

export function Search({ show, onClose }: SearchProps) {
  const [query, setQuery] = useState("");

  if (!show) return null;

  return (
    <div className="absolute left-0 right-0 top-full bg-white shadow-md z-40">
      <div className="container-custom py-4">
        <InstantSearchNext
          indexName={indexName}
          searchClient={searchClient}
          initialUiState={{ [indexName]: { query: "" } }}
          onStateChange={({ uiState }) => {
            setQuery(uiState[indexName]?.query || "");
          }}
        >
          <SearchContent query={query} setQuery={setQuery} onClose={onClose} />
        </InstantSearchNext>
      </div>
    </div>
  );
}

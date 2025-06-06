"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Layout from "./Layout";
import ProductGrid from "./ProductGrid";
import { Button } from "@/components/ui/button";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Product, Category } from "../../sanity.types";
import { Filter, SlidersHorizontal, X } from "lucide-react";

// ✅ Manually define Size and Color types
type Size = "S" | "M" | "L" | "XL";

type Color = {
  name: string;
  value: string;
};

interface FilterState {
  sizes: Size[];
  colors: string[]; // color.value
  priceRange: [number, number];
}

interface Props {
  products: Product[];
  categories: Category;
}

const MAX_PRICE = 200;

const capitalizeFirstLetter = (str: string) => {
  return str
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const CategoryPage: React.FC<Props> = ({ products, categories }) => {
  const { category } = useParams<{ category: string }>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const allColors: Color[] = Array.from(
    new Set(
      products.flatMap(
        (p) =>
          p.variants
            ?.map((v) => v.color) // Extract colors (might be undefined)
            .filter((color): color is { name: string; value: string } =>
              Boolean(color)
            ) // Filter out undefined or null colors
      )
    )
  )
    .map((color) => {
      return {
        name: color?.name.toLowerCase(), // Normalize to lowercase to avoid duplicates with different cases
        value: color?.value.toLowerCase(), // Normalize value as well
      } as Color;
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((c) => c.value === value.value) // Ensure no duplicates by value
    );

  const [filters, setFilters] = useState<FilterState>({
    sizes: [],
    colors: [],
    priceRange: [0, MAX_PRICE],
  });

  useEffect(() => {
    let filtered = category
      ? products.filter((p) => {
          // Check if p.category exists and if it has a slug
          return p.category?._ref === category;
        })
      : products;

    filtered = filtered.filter((p) => {
      const minPrice = Math.min(
        ...(p.variants?.map((v) => v.price ?? p.price ?? 0) || []) // If p.variants is undefined, fallback to an empty array
      );
      const maxPrice = Math.max(
        ...(p.variants?.map((v) => v.price ?? p.price ?? 0) || []) // Same logic for max price
      );
      return (
        maxPrice >= filters.priceRange[0] && minPrice <= filters.priceRange[1]
      );
    });

    if (filters.sizes.length > 0) {
      filtered = filtered.filter((p) => {
        const productSizes = new Set(p.variants?.map((v) => v.size));
        return filters.sizes.some((size) => productSizes.has(size));
      });
    }

    if (filters.colors.length > 0) {
      filtered = filtered.filter((p) => {
        const productColorValues = new Set(
          p.variants?.map((v) => v.color?.value?.toLowerCase()) // 🔥 this is the key fix
        );
        return filters.colors.some((color) => productColorValues.has(color));
      });
    }

    setFilteredProducts(filtered);
  }, [category, filters, products]);

  const toggleSizeFilter = (size: Size) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const toggleColorFilter = (colorValue: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(colorValue)
        ? prev.colors.filter((c) => c !== colorValue)
        : [...prev.colors, colorValue],
    }));
  };

  const clearFilters = () => {
    setFilters({
      sizes: [],
      colors: [],
      priceRange: [0, MAX_PRICE],
    });
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            {categories.name
              ? capitalizeFirstLetter(categories.name)
              : "All Products"}
          </h1>
          <Button
            variant="outline"
            className="flex items-center md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} className="mr-2" />
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters */}
          <div
            className={`
            ${showFilters ? "fixed inset-0 z-50 bg-white p-6 overflow-auto" : "hidden"}
            md:relative md:block md:z-auto
          `}
          >
            {/* Mobile Filter Header */}
            <div className="flex justify-between items-center mb-4 md:hidden">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(false)}
              >
                <X size={24} />
              </Button>
            </div>

            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-brand-700 h-auto py-1 cursor-pointer"
                >
                  Clear All
                </Button>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-md font-medium mb-4">Price Range</h3>
                <Slider
                  defaultValue={[0, MAX_PRICE]}
                  min={0}
                  max={MAX_PRICE}
                  step={1}
                  value={filters.priceRange}
                  onValueChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: value as [number, number],
                    }))
                  }
                  className="mb-2 cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="text-md font-medium mb-3">Size</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(["S", "M", "L", "XL"] as Size[]).map((size) => (
                    <label
                      key={size}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={filters.sizes.includes(size)}
                        onCheckedChange={() => toggleSizeFilter(size)}
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <h3 className="text-md font-medium mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {allColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => toggleColorFilter(color.value)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                        filters.colors.includes(color.value)
                          ? "border-2 border-brand-700"
                          : "border border-gray-300"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {filters.colors.includes(color.value) && (
                        <span
                          className={`text-xs ${
                            ["#FFFFFF", "#F5F5DC"].includes(color.value)
                              ? "text-black"
                              : "text-white"
                          }`}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:hidden pt-4 sticky bottom-0 bg-white">
                <Button
                  className="w-full"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="md:col-span-3">
            {/* Active Filters */}
            {(filters.sizes.length ||
              filters.colors.length ||
              filters.priceRange[0] > 0 ||
              filters.priceRange[1] < MAX_PRICE) && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Active Filters:</span>

                {(filters.priceRange[0] > 0 ||
                  filters.priceRange[1] < MAX_PRICE) && (
                  <span className="inline-flex items-center text-sm bg-brand-100 text-brand-800 px-2 py-1 rounded">
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                    <X
                      size={14}
                      className="ml-1 cursor-pointer"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          priceRange: [0, MAX_PRICE],
                        }))
                      }
                    />
                  </span>
                )}

                {filters.sizes.map((size) => (
                  <span
                    key={size}
                    className="inline-flex items-center text-sm bg-brand-100 text-brand-800 px-2 py-1 rounded"
                  >
                    Size: {size}
                    <X
                      size={14}
                      className="ml-1 cursor-pointer"
                      onClick={() => toggleSizeFilter(size)}
                    />
                  </span>
                ))}

                {filters.colors.map((colorValue) => {
                  const colorName =
                    allColors.find((c) => c.value === colorValue)?.name ||
                    colorValue;
                  return (
                    <span
                      key={colorValue}
                      className="inline-flex items-center text-sm bg-brand-100 text-brand-800 px-2 py-1 rounded"
                    >
                      <span
                        className="w-3 h-3 rounded-full mr-1 border border-gray-300"
                        style={{ backgroundColor: colorValue }}
                      ></span>
                      {colorName}
                      <X
                        size={14}
                        className="ml-1 cursor-pointer"
                        onClick={() => toggleColorFilter(colorValue)}
                      />
                    </span>
                  );
                })}

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm text-brand-700 cursor-pointer"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              </div>
            )}

            {/* Results */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                Showing {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "result" : "results"}
              </p>
              <div className="flex items-center">
                <SlidersHorizontal size={16} className="mr-2 text-gray-600" />
                <select className="text-sm border-none bg-transparent focus:outline-none">
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-gray-900">
                  No Products Found
                </h3>
                <p className="mt-2 text-gray-600">
                  Try adjusting your filters to find what you&apos;re looking
                  for.
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-6 cursor-pointer"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;

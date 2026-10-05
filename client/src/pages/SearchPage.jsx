import React, { useContext, useEffect, useState, useMemo } from "react";
import { LuArrowLeft, LuSearch, LuX, LuSparkles } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router-dom";
import { shopDataContext } from "../contexts/ShopContext";
import Card from "../components/Card";

const popularSearches = [
  "Gulab Jamun",
  "Kaju Katli",
  "Rasgulla",
  "Bhujia",
  "Motichoor Laddu",
  "Samosa",
];

const categories = ["All", "Sweets", "Snacks"];

function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, currency } = useContext(shopDataContext) || { products: [], currency: "₹" };

  // URL query params
  const urlQuery = searchParams.get("q") || "";
  const urlCategory = searchParams.get("category") || "All";

  // Filter & Search states
  const [query, setQuery] = useState(urlQuery);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [sortType, setSortType] = useState("relevant");
  const [showBestseller, setShowBestseller] = useState(false);

  // Sync state if URL search params change
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    if (searchParams.get("category")) {
      setSelectedCategory(searchParams.get("category"));
    }
  }, [searchParams]);

  // Update URL search parameters
  const updateUrlParams = (newQuery, newCategory) => {
    const params = {};
    if (newQuery && newQuery.trim()) {
      params.q = newQuery.trim();
    }
    if (newCategory && newCategory !== "All") {
      params.category = newCategory;
    }
    setSearchParams(params, { replace: true });
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    updateUrlParams(query, selectedCategory);
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    updateUrlParams(query, cat);
  };

  const handlePopularSearchClick = (item) => {
    setQuery(item);
    updateUrlParams(item, selectedCategory);
  };

  const handleClearSearch = () => {
    setQuery("");
    updateUrlParams("", selectedCategory);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];

    let list = [...products];

    // 1. Search text filter (name, category, subCategory, description)
    const trimmed = query.trim().toLowerCase();
    if (trimmed) {
      list = list.filter((p) => {
        const nameMatch = p.name?.toLowerCase().includes(trimmed);
        const categoryMatch = p.category?.toLowerCase().includes(trimmed);
        const subCategoryMatch = p.subCategory?.toLowerCase().includes(trimmed);
        const descMatch = p.description?.toLowerCase().includes(trimmed);
        return nameMatch || categoryMatch || subCategoryMatch || descMatch;
      });
    }

    // 2. Category filter
    if (selectedCategory && selectedCategory !== "All") {
      list = list.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 3. Bestseller filter
    if (showBestseller) {
      list = list.filter((p) => p.bestSeller === true);
    }

    // 4. Sorting
    if (sortType === "low-high") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, query, selectedCategory, showBestseller, sortType]);

  return (
    <div className="w-full min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] overflow-x-hidden text-[#c3f6fa]">
      {/* Spacer for fixed navbar */}
      <div className="h-[10vh] min-h-[80px] w-full shrink-0 sm:h-[12vh]" />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top bar: Back Button & Quick Actions */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/15 px-4 py-2 text-[13px] font-bold text-[#c3f6fa] backdrop-blur-sm transition hover:bg-white/20 hover:border-[#a5faf7]/50 active:scale-95 cursor-pointer"
          >
            <LuArrowLeft className="text-[17px] text-[#a5faf7]" />
            BACK TO HOME
          </button>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#a5faf7]/70">
            <LuSparkles className="text-[#a5faf7]" />
            Fresh Handcrafted Sweets &amp; Savouries
          </span>
        </div>

        {/* Search Control Card */}
        <div className="mb-8 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md p-4 sm:p-6 shadow-xl">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 rounded-2xl border-2 border-[#a5faf7]/40 bg-black/40 px-3.5 py-2.5 shadow-inner focus-within:border-[#a5faf7] transition-all"
          >
            <LuSearch className="shrink-0 text-[20px] text-[#a5faf7]" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                updateUrlParams(e.target.value, selectedCategory);
              }}
              placeholder="Search sweets, snacks, namkeen, dry fruits..."
              className="min-w-0 flex-1 bg-transparent px-1 text-[15px] sm:text-[16px] text-white outline-none placeholder:text-white/40"
            />
            {query && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="shrink-0 p-1 text-white/50 hover:text-white transition cursor-pointer"
                aria-label="Clear search"
              >
                <LuX className="text-[18px]" />
              </button>
            )}
            <button
              type="submit"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#faae33] text-[#823513] transition hover:bg-[#ffcb78] active:scale-95 cursor-pointer font-bold"
              aria-label="Search"
            >
              <LuSearch className="text-[18px]" />
            </button>
          </form>

          {/* Categories & Filter Badges */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider mr-1">
                Category:
              </span>
              {categories.map((cat) => {
                const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategorySelect(cat)}
                    className={`rounded-xl px-3.5 py-1.5 text-[12px] sm:text-[13px] font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#a5faf7] text-[#0c2025] shadow-[0_0_12px_rgba(165,250,247,0.35)]"
                        : "bg-white/10 text-[#c3f6fa] hover:bg-white/20"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Sort & Bestseller Toggle */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Bestseller toggle */}
              <button
                type="button"
                onClick={() => setShowBestseller((prev) => !prev)}
                className={`rounded-xl px-3 py-1.5 text-[12px] sm:text-[13px] font-bold border transition-all cursor-pointer ${
                  showBestseller
                    ? "border-[#faae33] bg-[#faae33]/20 text-[#faae33] shadow-[0_0_10px_rgba(250,174,51,0.25)]"
                    : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                ★ Bestsellers Only
              </button>

              {/* Sort selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-white/50">Sort:</span>
                <select
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  className="cursor-pointer rounded-xl border border-white/20 bg-black/60 px-3 py-1.5 text-xs sm:text-[13px] text-[#c3f6fa] outline-none transition focus:border-[#a5faf7]"
                >
                  <option value="relevant">Relevant</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Popular searches suggestions */}
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-white/10 text-xs">
            <span className="text-white/40">Popular:</span>
            {popularSearches.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handlePopularSearchClick(item)}
                className="rounded-full bg-white/5 hover:bg-white/15 border border-white/10 px-2.5 py-1 text-white/75 hover:text-[#a5faf7] transition cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-wide text-[#c3f6fa] sm:text-2xl">
              Search Results
              <span className="ml-2 text-sm font-normal text-white/40">
                ({filteredProducts.length} items found)
              </span>
            </h1>
            {query.trim() && (
              <p className="mt-1 text-sm text-[#a5faf7]/80">
                Showing delicacies matching{" "}
                <span className="font-bold text-white">"{query.trim()}"</span>
              </p>
            )}
          </div>

          {(query.trim() || selectedCategory !== "All" || showBestseller) && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedCategory("All");
                setShowBestseller(false);
                setSortType("relevant");
                setSearchParams({}, { replace: true });
              }}
              className="text-xs text-[#a5faf7] hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {filteredProducts.map((item, index) => (
              <Card
                key={item._id ?? index}
                name={item.name}
                image={item.image1}
                id={item._id}
                price={item.price}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm py-16 px-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl mb-4">
              🍬
            </div>
            <h3 className="text-lg font-bold text-white">
              No matching sweets or snacks found
            </h3>
            <p className="mt-1.5 max-w-md text-sm text-white/50">
              We couldn't find anything matching{" "}
              {query ? `"${query}"` : "your selected filters"}. Try checking
              spelling or exploring popular items below.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {popularSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handlePopularSearchClick(item)}
                  className="rounded-full bg-[#faae33] px-4 py-1.5 text-xs font-bold text-[#823513] hover:bg-[#ffcb78] transition cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom padding for mobile bottom nav bar */}
      <div className="h-[80px] shrink-0 lg:hidden" />
    </div>
  );
}

export default SearchPage;

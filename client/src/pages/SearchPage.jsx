import React, { useState } from "react";
import { LuArrowLeft, LuSearch, LuX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const popularSearches = [
  "Gulab Jamun",
  "Kaju Katli",
  "Rasgulla",
  "Bhujia",
  "Motichoor Laddu",
  "Samosa",
];

const categories = ["All", "Sweets", "Snacks", "Gift Boxes"];

function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Search functionality will be connected later.
  };

  return (
    <main className="min-h-screen bg-[#fff5df] px-4 pt-[130px] sm:pt-[160px] pb-28 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">
        {/* Back Button */}
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-[#faae33] px-3.5 py-2 text-[12px] font-bold text-[#823513] shadow-xs transition hover:bg-[#ffcb78] active:scale-95"
          >
            <LuArrowLeft className="text-[16px]" />
            BACK TO HOME
          </button>
        </div>

        {/* Search Card */}
        <div className="rounded-3xl border-2 border-yellow-300 bg-[#fffaf0] p-4 sm:p-6 shadow-md">
          <div className="mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-[#823513]">
              Search Sweets & Snacks
            </h1>
            <p className="mt-0.5 text-xs sm:text-sm text-[#9e7357]">
              Find your favorite freshly prepared delicacies.
            </p>
          </div>

          {/* Search Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 rounded-2xl border-2 border-[#faae33] bg-white px-3 py-2 shadow-xs focus-within:border-[#823513] transition-colors"
          >
            <LuSearch className="shrink-0 text-[19px] text-[#823513]" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search sweets, snacks, namkeen..."
              className="min-w-0 flex-1 bg-transparent px-1 py-0.5 text-[14px] text-[#823513] outline-none placeholder:text-[#9e7357] sm:text-[15px]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="shrink-0 p-1 text-[#9e7357] hover:text-[#823513]"
                aria-label="Clear input"
              >
                <LuX className="text-[16px]" />
              </button>
            )}
            <button
              type="submit"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#faae33] text-[#823513] transition hover:bg-[#ffcb78] active:scale-95"
              aria-label="Search"
            >
              <LuSearch className="text-[17px]" />
            </button>
          </form>

          {/* Categories Filter */}
          <div className="mt-5">
            <p className="mb-2 text-[11px] font-bold tracking-[0.14em] text-[#9e7357]">
              CATEGORIES
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-3 py-1.5 text-[12px] font-bold transition ${
                    selectedCategory === cat
                      ? "bg-[#823513] text-[#ffcb78] shadow-xs"
                      : "bg-[#faae33]/40 text-[#823513] hover:bg-[#faae33]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Searches */}
          <section className="mt-5 border-t border-yellow-200/80 pt-4">
            <p className="mb-2.5 text-[11px] font-bold tracking-[0.14em] text-[#9e7357]">
              POPULAR SEARCHES
            </p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setQuery(item)}
                  className="rounded-full border border-yellow-400/60 bg-[#faae33] px-3.5 py-1.5 text-[12px] font-semibold text-[#823513] shadow-2xs transition hover:bg-[#ffcb78] active:scale-95"
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default SearchPage;

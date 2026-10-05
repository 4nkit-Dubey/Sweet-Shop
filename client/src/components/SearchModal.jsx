import React, { useContext, useEffect, useState } from "react";
import { LuSearch, LuX, LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { shopDataContext } from "../contexts/ShopContext";

const popularSearches = [
  "Gulab Jamun",
  "Kaju Katli",
  "Rasgulla",
  "Bhujia",
];

const categories = ["Sweets", "Snacks", "Gift Boxes"];

function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { products, currency } = useContext(shopDataContext) || { products: [], currency: "₹" };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSearchSubmit = (searchTerm) => {
    const term = (searchTerm !== undefined ? searchTerm : query).trim();
    if (term) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(term)}`);
    }
  };

  const handleCategoryClick = (category) => {
    onClose();
    navigate(`/search?category=${encodeURIComponent(category)}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearchSubmit(query);
  };

  // Live preview matches from shop products (up to 4)
  const trimmedQuery = query.trim().toLowerCase();
  const previewMatches = trimmedQuery
    ? (products || [])
        .filter((item) => {
          const nameMatch = item.name?.toLowerCase().includes(trimmedQuery);
          const categoryMatch = item.category?.toLowerCase().includes(trimmedQuery);
          const subCategoryMatch = item.subCategory?.toLowerCase().includes(trimmedQuery);
          return nameMatch || categoryMatch || subCategoryMatch;
        })
        .slice(0, 4)
    : [];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs px-3 py-4 sm:px-6 sm:py-12 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onMouseDown={onClose}
    >
      <div
        className="mx-auto mt-[85px] sm:mt-[95px] w-full max-w-[640px] overflow-hidden rounded-3xl border-2 border-yellow-300 bg-[#fff5df] shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 sm:gap-3 border-b border-[#e8c995] bg-[#fffaf0] p-3.5 sm:p-5"
        >
          <LuSearch className="shrink-0 text-[20px] sm:text-[22px] text-[#823513]" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search sweets, snacks, namkeen..."
            className="min-w-0 flex-1 bg-transparent text-[14px] sm:text-[16px] text-[#823513] outline-none placeholder:text-[#9e7357]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-[#9e7357] hover:text-[#823513]"
              aria-label="Clear query"
            >
              <LuX className="text-[17px]" />
            </button>
          )}
          <button
            type="submit"
            className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-[#faae33] text-[#823513] transition hover:bg-[#ffcb78] active:scale-95 cursor-pointer"
            aria-label="Search"
          >
            <LuSearch className="text-[17px] sm:text-[18px]" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gray-200/70 text-[#823513] transition hover:bg-gray-300 active:scale-95 cursor-pointer"
            aria-label="Close search"
          >
            <LuX className="text-[18px]" />
          </button>
        </form>

        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {/* If user is typing, show instant live matching preview */}
          {trimmedQuery ? (
            <section>
              <div className="mb-2.5 flex items-center justify-between">
                <p className="text-[11px] font-bold tracking-[0.16em] text-[#9e7357]">
                  MATCHING ITEMS
                </p>
                {previewMatches.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleSearchSubmit(query)}
                    className="text-[12px] font-bold text-[#823513] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View all results <LuArrowRight className="text-[13px]" />
                  </button>
                )}
              </div>

              {previewMatches.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {previewMatches.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => handleSearchSubmit(item.name)}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-[#fffaf0] border border-[#e8c995] p-2.5 hover:bg-[#faae33]/20 cursor-pointer transition"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image1}
                          alt={item.name}
                          className="h-11 w-11 rounded-xl object-cover border border-[#e8c995]"
                        />
                        <div>
                          <p className="text-[14px] font-bold text-[#823513] line-clamp-1">
                            {item.name}
                          </p>
                          <span className="text-[11px] font-semibold text-[#9e7357] uppercase tracking-wider">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-[14px] font-bold text-[#823513] shrink-0">
                        {currency}{item.price}
                      </p>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => handleSearchSubmit(query)}
                    className="mt-2 w-full py-2.5 rounded-2xl bg-[#faae33] text-[13px] font-bold text-[#823513] hover:bg-[#ffcb78] transition text-center"
                  >
                    See all results for "{query}"
                  </button>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-[14px] font-semibold text-[#823513]">
                    No sweet or snack found for "{query}"
                  </p>
                  <p className="text-[12px] text-[#9e7357] mt-1">
                    Press Enter to explore or try the popular searches below
                  </p>
                </div>
              )}
            </section>
          ) : (
            <>
              {/* Popular Searches */}
              <section>
                <p className="mb-2.5 text-[11px] font-bold tracking-[0.16em] text-[#9e7357]">
                  POPULAR SEARCHES
                </p>
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                  {popularSearches.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleSearchSubmit(item)}
                      className="flex items-center gap-2.5 rounded-2xl bg-[#faae33] px-3.5 py-2.5 text-left text-[13px] sm:text-[14px] font-semibold text-[#823513] transition hover:bg-[#ffcb78] active:scale-98 cursor-pointer"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fff5df] text-[12px]">
                        🍬
                      </span>
                      {item}
                    </button>
                  ))}
                </div>
              </section>

              {/* Categories */}
              <section className="mt-5 border-t border-[#e8c995] pt-4">
                <p className="mb-2.5 text-[11px] font-bold tracking-[0.16em] text-[#9e7357]">
                  CATEGORIES
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategoryClick(category)}
                      className="rounded-full border border-[#faae33] bg-[#fffaf0] px-3.5 py-1.5 text-[12px] sm:text-[13px] font-semibold text-[#823513] transition hover:bg-[#ffcb78] active:scale-95 cursor-pointer"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}

          <p className="mt-5 text-center text-[11px] text-[#9e7357]">
            Press <span className="font-bold text-[#823513]">Enter</span> to see all results, <span className="font-bold text-[#823513]">Esc</span> to close
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;

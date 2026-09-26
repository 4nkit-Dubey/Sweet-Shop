import React, { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";

const popularSearches = [
  "Gulab Jamun",
  "Kaju Katli",
  "Rasgulla",
  "Bhujia",
];

const categories = ["Sweets", "Snacks", "Gift Boxes"];

function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Search functionality will be connected later.
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[6px] px-4 py-8 sm:px-6 sm:py-12"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onMouseDown={onClose}
    >
      <div
        className="mx-auto mt-[7vh] w-full max-w-[680px] overflow-hidden rounded-3xl border-2 border-yellow-300 bg-[#fff5df] shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border-b border-[#e8c995] bg-[#fffaf0] p-4 sm:p-5"
        >
          <LuSearch className="shrink-0 text-[22px] text-[#823513]" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search sweets, snacks..."
            className="min-w-0 flex-1 bg-transparent text-[15px] text-[#823513] outline-none placeholder:text-[#9e7357] sm:text-[16px]"
          />
          <button
            type="submit"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#faae33] text-[#823513] transition hover:bg-[#ffcb78]"
            aria-label="Search"
          >
            <LuSearch className="text-[18px]" />
          </button>
        </form>

        <div className="max-h-[65vh] overflow-y-auto p-4 sm:p-6">
          <section>
            <p className="mb-3 text-[11px] font-bold tracking-[0.16em] text-[#9e7357]">
              POPULAR SEARCHES
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {popularSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setQuery(item)}
                  className="flex items-center gap-3 rounded-2xl bg-[#faae33] px-4 py-3 text-left text-[14px] font-semibold text-[#823513] transition hover:bg-[#ffcb78]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff5df] text-[13px]">
                    🍬
                  </span>
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-6 border-t border-[#e8c995] pt-5">
            <p className="mb-3 text-[11px] font-bold tracking-[0.16em] text-[#9e7357]">
              CATEGORIES
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setQuery(category)}
                  className="rounded-full border border-[#faae33] bg-[#fffaf0] px-4 py-2 text-[13px] font-semibold text-[#823513] transition hover:bg-[#ffcb78]"
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          <p className="mt-6 text-center text-[11px] text-[#9e7357]">
            Press <span className="font-bold text-[#823513]">Esc</span> or click outside to close
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;

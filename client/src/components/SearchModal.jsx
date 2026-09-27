import React, { useEffect, useState } from "react";
import { LuSearch, LuX } from "react-icons/lu";

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
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs px-3 py-4 sm:px-6 sm:py-12 overflow-y-auto"
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
            placeholder="Search sweets, snacks..."
            className="min-w-0 flex-1 bg-transparent text-[14px] sm:text-[16px] text-[#823513] outline-none placeholder:text-[#9e7357]"
          />
          <button
            type="submit"
            className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-[#faae33] text-[#823513] transition hover:bg-[#ffcb78] active:scale-95"
            aria-label="Search"
          >
            <LuSearch className="text-[17px] sm:text-[18px]" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gray-200/70 text-[#823513] transition hover:bg-gray-300 active:scale-95"
            aria-label="Close search"
          >
            <LuX className="text-[18px]" />
          </button>
        </form>

        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          <section>
            <p className="mb-2.5 text-[11px] font-bold tracking-[0.16em] text-[#9e7357]">
              POPULAR SEARCHES
            </p>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
              {popularSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setQuery(item)}
                  className="flex items-center gap-2.5 rounded-2xl bg-[#faae33] px-3.5 py-2.5 text-left text-[13px] sm:text-[14px] font-semibold text-[#823513] transition hover:bg-[#ffcb78] active:scale-98"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fff5df] text-[12px]">
                    🍬
                  </span>
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-5 border-t border-[#e8c995] pt-4">
            <p className="mb-2.5 text-[11px] font-bold tracking-[0.16em] text-[#9e7357]">
              CATEGORIES
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setQuery(category)}
                  className="rounded-full border border-[#faae33] bg-[#fffaf0] px-3.5 py-1.5 text-[12px] sm:text-[13px] font-semibold text-[#823513] transition hover:bg-[#ffcb78] active:scale-95"
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          <p className="mt-5 text-center text-[11px] text-[#9e7357]">
            Press <span className="font-bold text-[#823513]">Esc</span> or tap outside / X to close
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;

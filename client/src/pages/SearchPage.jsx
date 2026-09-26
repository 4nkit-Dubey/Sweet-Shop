import React, { useState } from "react";
import { LuArrowLeft, LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const popularSearches = [
  "Gulab Jamun",
  "Kaju Katli",
  "Rasgulla",
  "Bhujia",
];

function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Search functionality will be connected later.
  };

  return (
    <main className="min-h-screen bg-[#fff5df] px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-5 inline-flex items-center gap-2 rounded-2xl bg-[#faae33] px-4 py-2.5 text-[13px] font-bold text-[#823513] transition hover:bg-[#ffcb78]"
        >
          <LuArrowLeft className="text-[17px]" />
          HOME
        </button>

        <div className="rounded-3xl border-2 border-yellow-300 bg-[#fffaf0] p-4 shadow-lg sm:p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-[#823513] sm:text-3xl">
              Search
            </h1>
            <p className="mt-1 text-sm text-[#9e7357]">
              Find your favourite sweets and snacks.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 rounded-2xl border-2 border-[#faae33] bg-white px-3 py-2"
          >
            <LuSearch className="shrink-0 text-[21px] text-[#823513]" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search sweets, snacks..."
              className="min-w-0 flex-1 bg-transparent px-1 py-1 text-[14px] text-[#823513] outline-none placeholder:text-[#9e7357] sm:text-[15px]"
            />
            <button
              type="submit"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#faae33] text-[#823513] transition hover:bg-[#ffcb78]"
              aria-label="Search"
            >
              <LuSearch className="text-[18px]" />
            </button>
          </form>

          <section className="mt-7">
            <p className="mb-3 text-[11px] font-bold tracking-[0.16em] text-[#9e7357]">
              POPULAR SEARCHES
            </p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setQuery(item)}
                  className="rounded-full border border-[#faae33] bg-[#faae33] px-4 py-2.5 text-[13px] font-semibold text-[#823513] transition hover:bg-[#ffcb78]"
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

import React, { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../contexts/ShopContext";
import Card from "../components/Card";
import { LuChevronDown, LuChevronUp, LuSlidersHorizontal } from "react-icons/lu";

const Sweets = () => {
  const { products } = useContext(shopDataContext);

  // All products stored, productsCopy = filtered sweets
  const [productsCopy, setProductsCopy] = useState([]);

  // Filter states (multi-select possible)
  const [deliveryFilter, setDeliveryFilter] = useState([]); // [] | ['Deliverable'] | ['NON-Deliverable'] | both
  const [showBestseller, setShowBestseller] = useState(false);

  // Sort state (UI only — logic will be added later)
  const [sortType, setSortType] = useState("recent");

  // Mobile filter panel toggle
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter products whenever source data or filters change
  useEffect(() => {
    let filtered = products.filter((p) => p.category === "Sweets");

    // Delivery filter: if any selected, show only matching subCategories
    if (deliveryFilter.length > 0) {
      filtered = filtered.filter((p) => deliveryFilter.includes(p.subCategory));
    }

    // Bestseller filter
    if (showBestseller) {
      filtered = filtered.filter((p) => p.bestSeller === true);
    }

    setProductsCopy(filtered);
  }, [products, deliveryFilter, showBestseller]);

  const toggleDeliveryFilter = (value) => {
    setDeliveryFilter((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  // Reusable toggle switch
  const ToggleSwitch = ({ label, isOn, onToggle }) => (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <span className="text-sm text-[#c3f6fa]/80 font-medium">{label}</span>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={isOn}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#a5faf7]/50 ${
          isOn ? "bg-[#a5faf7]" : "bg-white/20"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
            isOn ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  // Filter panel JSX — used in both sidebar and mobile drawer
  const filterPanelContent = (
    <div className="flex flex-col gap-1">
      {/* --- Delivery Filter --- */}
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#a5faf7]">
          Delivery
        </p>
        <ToggleSwitch
          label="Deliverable"
          isOn={deliveryFilter.includes("Deliverable")}
          onToggle={() => toggleDeliveryFilter("Deliverable")}
        />
        <ToggleSwitch
          label="Non-Deliverable"
          isOn={deliveryFilter.includes("NON-Deliverable")}
          onToggle={() => toggleDeliveryFilter("NON-Deliverable")}
        />
      </div>

      {/* Divider */}
      <div className="my-2 h-px bg-white/10" />

      {/* --- Type Filter --- */}
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#a5faf7]">
          Type
        </p>
        <ToggleSwitch
          label="All"
          isOn={!showBestseller}
          onToggle={() => setShowBestseller(false)}
        />
        <ToggleSwitch
          label="Bestseller"
          isOn={showBestseller}
          onToggle={() => setShowBestseller(true)}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] overflow-x-hidden">
      {/* Spacer for fixed navbar */}
      <div className="h-[10vh] min-h-[80px] w-full shrink-0 sm:h-[12vh]" />

      {/* ===== MOBILE: Filter & Sort bar ===== */}
      <div className="lg:hidden sticky top-[80px] sm:top-[12vh] z-30 border-b border-dashed border-[#a5faf7]/20 bg-[#0c2025]/90 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setIsMobileFilterOpen((prev) => !prev)}
          className="flex w-full items-center justify-between px-4 py-3 text-[#c3f6fa]"
        >
          <div className="flex items-center gap-2">
            <LuSlidersHorizontal className="text-[16px] text-[#a5faf7]" />
            <span className="text-sm font-bold tracking-widest uppercase">
              Filters &amp; Sort
            </span>
          </div>
          {isMobileFilterOpen ? (
            <LuChevronUp className="text-[#a5faf7]" />
          ) : (
            <LuChevronDown className="text-[#a5faf7]" />
          )}
        </button>

        {isMobileFilterOpen && (
          <div className="border-t border-white/10 px-4 pb-5 pt-3 bg-white/5 backdrop-blur-sm">
            {/* Sort */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#a5faf7]">
                Sort By
              </p>
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="w-full cursor-pointer rounded-xl border border-white/20 bg-black/40 px-3 py-2.5 text-sm text-[#c3f6fa] outline-none focus:border-[#a5faf7]"
              >
                <option value="recent">Recent Products</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            {/* Divider */}
            <div className="mb-4 h-px bg-white/10" />

            {/* Filters */}
            {filterPanelContent}
          </div>
        )}
      </div>

      {/* ===== MAIN LAYOUT ===== */}
      <div className="flex items-start gap-6 px-4 py-6 sm:px-6 lg:px-8">

        {/* ===== SIDEBAR (large screen only) ===== */}
        <aside className="hidden lg:block w-[220px] shrink-0 sticky top-[100px]">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
            <h2 className="mb-4 border-b border-white/10 pb-3 text-sm font-bold uppercase tracking-widest text-[#a5faf7]">
              Filters
            </h2>
            {filterPanelContent}
          </div>
        </aside>

        {/* ===== PRODUCTS AREA ===== */}
        <div className="flex-1 min-w-0">

          {/* Top bar: Title + Sort (large screen) */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl font-bold tracking-wide text-[#c3f6fa] sm:text-2xl">
              SWEETS{" "}
              <span className="text-base font-normal text-white/40">
                ({productsCopy.length})
              </span>
            </h1>

            {/* Sort dropdown — large screen only */}
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-sm text-white/50">Sort by:</span>
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="cursor-pointer rounded-xl border border-white/20 bg-black/40 px-3 py-2 text-sm text-[#c3f6fa] outline-none transition focus:border-[#a5faf7]"
              >
                <option value="recent">Recent Products</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products grid */}
          {productsCopy.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {productsCopy.map((item, index) => (
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
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-lg font-semibold text-[#a5faf7]/50">
                No products found
              </p>
              <p className="mt-2 text-sm text-white/30">
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom padding for mobile bottom nav */}
      <div className="h-[80px] shrink-0 lg:hidden" />
    </div>
  );
};

export default Sweets;

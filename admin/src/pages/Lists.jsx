import logger from "../utils/logger.js";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";

const Lists = () => {
  let [list, setList] = useState([]);
  let { serverUrl } = useContext(authDataContext);

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      setList(result.data.product ?? []);
    } catch (error) {
      logger.log(error);
    }
  };


  const removeList = async (id) => {
    try {
      let result = await axios.post(
        serverUrl + `/api/product/remove/${id}`,
        {},
        { withCredentials: true },
      );
      if (result.data) {
        fetchList();
        toast.success("Product removed successfully! ✓");
      } else {
        logger.log("Failed to remove product");
        toast.error("Failed to remove product. Please try again.");
      }
    } catch (error) {
      logger.log(error);
      toast.error("Failed to remove product. Please try again.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div
      className="fixed inset-0 overflow-hidden bg-gradient-to-br from-[#0c2025] via-[#10282e] to-[#141414]"
    >
      <Nav />
      <Sidebar />

      <main className="absolute bottom-0 left-0 right-0 top-20 overflow-y-auto overflow-x-hidden md:left-[18%] pb-16 md:pb-0">
        <div className="px-3 py-4 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-4xl rounded-2xl border-2 border-dashed border-white/50 p-3 shadow-2xl backdrop-blur-sm sm:p-6 lg:p-8">

            {/* Heading */}
            <div className="mb-4 border-b border-dashed border-white/25 pb-3">
              <h1 className="font-serif text-xl font-bold tracking-tight text-white sm:text-3xl">
                All Listed Products
              </h1>
              <p className="mt-0.5 text-xs text-white/70 sm:text-sm">
                Manage and remove products from your menu.
              </p>
            </div>

            {list?.length > 0 ? (
              <>
                {/* ── Desktop Table (sm and above) ── */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-sm text-white/90">
                    <thead>
                      <tr className="border-b border-white/20 text-left text-xs font-semibold uppercase tracking-wider text-[#a5faf7]">
                        <th className="pb-3 pr-3">#</th>
                        <th className="pb-3 pr-3">Image</th>
                        <th className="pb-3 pr-3">Name</th>
                        <th className="pb-3 pr-3">Category</th>
                        <th className="pb-3 pr-3">Price</th>
                        <th className="pb-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((item, index) => (
                        <tr
                          key={item._id}
                          className="border-b border-white/10 transition hover:bg-white/5"
                        >
                          <td className="py-2.5 pr-3 text-white/50 text-xs">{index + 1}</td>
                          <td className="py-2.5 pr-3">
                            <img
                              src={item.image1}
                              alt={item.name}
                              className="h-12 w-12 rounded-lg object-cover border border-white/20"
                            />
                          </td>
                          <td className="py-2.5 pr-3 font-medium text-white text-sm">{item.name}</td>
                          <td className="py-2.5 pr-3">
                            <span className="rounded-full border border-[#a5faf7]/25 bg-[#a5faf7]/10 px-2.5 py-0.5 text-xs font-semibold text-[#a5faf7]">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-2.5 pr-3 text-sm font-semibold text-white/90">
                            ₹{item.price}
                          </td>
                          <td className="py-2.5 text-right">
                            <button
                              onClick={() => removeList(item._id)}
                              className="rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/15 transition hover:bg-slate-600 active:scale-95"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ── Mobile Cards (below sm) ── */}
                <div className="flex flex-col gap-2 sm:hidden">
                  {list.map((item, index) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/30 p-2 transition hover:border-white/40"
                    >
                      {/* Serial */}
                      <span className="w-5 shrink-0 text-center text-[10px] text-white/40 font-medium">
                        {index + 1}
                      </span>

                      {/* Image */}
                      <img
                        src={item.image1}
                        alt={item.name}
                        className="h-12 w-12 shrink-0 rounded-lg object-cover border border-white/20"
                      />

                      {/* Info */}
                      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden min-w-0">
                        <p className="truncate text-xs font-semibold text-white leading-tight">{item.name}</p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="rounded-full border border-[#a5faf7]/25 bg-[#a5faf7]/10 px-2 py-0.5 text-[10px] font-medium text-[#a5faf7]">
                            {item.category}
                          </span>
                          <span className="text-[10px] font-semibold text-white/80">
                            ₹{item.price}
                          </span>
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeList(item._id)}
                        className="shrink-0 rounded-lg bg-slate-700 px-2.5 py-1.5 text-[10px] font-semibold text-white ring-1 ring-white/15 transition hover:bg-slate-600 active:scale-95"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Footer count */}
                <p className="mt-3 text-right text-xs text-white/40">
                  {list.length} product{list.length !== 1 ? "s" : ""} listed
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <p className="text-base font-semibold text-white/60">No Products Available</p>
                <p className="text-xs text-white/40">Add products from the "Add" section to see them here.</p>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default Lists;

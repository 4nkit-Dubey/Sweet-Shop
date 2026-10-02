import { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import bgimage from "../assets/background-image.png";
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
      console.log(error);
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
      } else {
        console.log("Failed to remove product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div
      className="fixed inset-0 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <Nav />
      <Sidebar />

      <main className="absolute bottom-0 left-0 right-0 top-20 overflow-y-auto overflow-x-hidden md:left-[18%] pb-16 md:pb-0">
        <div className="px-3 py-4 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-4xl rounded-2xl border-2 border-dashed border-[#e3b566]/70 p-3 shadow-2xl backdrop-blur-sm sm:p-6 lg:p-8">

            {/* Heading */}
            <div className="mb-4 border-b border-dashed border-[#e3b566]/40 pb-3">
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
                      <tr className="border-b border-[#e3b566]/30 text-left text-xs font-semibold uppercase tracking-wider text-[#e3b566]">
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
                          className="border-b border-[#e3b566]/10 transition hover:bg-white/5"
                        >
                          <td className="py-2.5 pr-3 text-white/50 text-xs">{index + 1}</td>
                          <td className="py-2.5 pr-3">
                            <img
                              src={item.image1}
                              alt={item.name}
                              className="h-12 w-12 rounded-lg object-cover border border-[#e3b566]/30"
                            />
                          </td>
                          <td className="py-2.5 pr-3 font-medium text-white text-sm">{item.name}</td>
                          <td className="py-2.5 pr-3">
                            <span className="rounded-full border border-[#e3b566]/40 bg-[#e3b566]/10 px-2.5 py-0.5 text-xs font-semibold text-[#e3b566]">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-2.5 pr-3 text-sm font-semibold text-white/90">
                            ₹{item.price}
                          </td>
                          <td className="py-2.5 text-right">
                            <button
                              onClick={() => removeList(item._id)}
                              className="rounded-lg bg-[#7f1d1d] px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-[#e3b566]/30 transition hover:bg-[#681818] active:scale-95"
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
                      className="flex items-center gap-2 rounded-xl border border-[#e3b566]/30 bg-black/30 p-2 transition hover:border-[#e3b566]/60"
                    >
                      {/* Serial */}
                      <span className="w-5 shrink-0 text-center text-[10px] text-white/40 font-medium">
                        {index + 1}
                      </span>

                      {/* Image */}
                      <img
                        src={item.image1}
                        alt={item.name}
                        className="h-12 w-12 shrink-0 rounded-lg object-cover border border-[#e3b566]/30"
                      />

                      {/* Info */}
                      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden min-w-0">
                        <p className="truncate text-xs font-semibold text-white leading-tight">{item.name}</p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="rounded-full border border-[#e3b566]/40 bg-[#e3b566]/10 px-2 py-0.5 text-[10px] font-medium text-[#e3b566]">
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
                        className="shrink-0 rounded-lg bg-[#7f1d1d] px-2.5 py-1.5 text-[10px] font-semibold text-white ring-1 ring-[#e3b566]/30 transition hover:bg-[#681818] active:scale-95"
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

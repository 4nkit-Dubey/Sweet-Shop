import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { SiEbox } from "react-icons/si";
import { FaRupeeSign } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { authDataContext } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Fetch all orders and products
  useEffect(() => {
    let isCurrent = true;
    const fetchAllOrders = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/order/list`, {
          withCredentials: true,
        });
        if (!Array.isArray(result.data)) {
          throw new Error("The server returned an invalid order list.");
        }
        if (isCurrent) {
          setOrders([...result.data].reverse());
          setLoadError("");
        }
      } catch (error) {
        if (isCurrent) {
          setLoadError(
            error?.response?.data?.message ||
              error?.message ||
              "Unable to load dashboard data. Please try again."
          );
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    };

    const fetchAllProducts = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/product/list`);
        if (result.data && Array.isArray(result.data.product)) {
          setProducts([...result.data.product].reverse());
        }
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchAllOrders();
    fetchAllProducts();
    return () => {
      isCurrent = false;
    };
  }, [serverUrl]);

  // Calculate stats
  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + (Number(order.amount) || 0), 0),
    pendingOrders: orders.filter((order) => order.status !== "Delivered").length,
    deliveredOrders: orders.filter((order) => order.status === "Delivered").length,
  };

  // Prepare chart data - order status breakdown
  const statusCounts = {
    "Order Placed": 0,
    "Packing": 0,
    "Shipped": 0,
    "Out for delivery": 0,
    "Delivered": 0,
  };

  orders.forEach((order) => {
    if (statusCounts[order.status] !== undefined) {
      statusCounts[order.status]++;
    }
  });

  const chartData = Object.entries(statusCounts)
    .filter(([, count]) => count > 0)
    .map(([status, count]) => ({
      name: status,
      value: count,
    }));

  // Status colors matching existing badge styles
  const statusColors = {
    "Order Placed": "#0ea5e9",    // sky
    "Packing": "#06b6d4",          // cyan
    "Shipped": "#a78bfa",          // violet
    "Out for delivery": "#3b82f6", // blue
    "Delivered": "#10b981",        // emerald
  };

  // Get recent orders (last 8)
  const recentOrders = orders.slice(0, 8);

  // Get status badge style (from Order.jsx)
  const statusStyles = {
    "Order Placed": "border-sky-300/25 bg-sky-300/10 text-sky-200",
    "Packing": "border-cyan-300/25 bg-cyan-300/10 text-cyan-200",
    "Shipped": "border-violet-300/25 bg-violet-300/10 text-violet-200",
    "Out for delivery": "border-blue-300/25 bg-blue-300/10 text-blue-200",
    "Delivered": "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col bg-linear-to-l from-[#141414] to-[#0c2025]">
      <Nav />
      <Sidebar />

      <main className="absolute bottom-0 left-0 right-0 top-20 overflow-y-auto overflow-x-hidden pb-24 md:left-[18%] md:pb-0">
        <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-9">
          {/* ═══════════════════════════════════════════════════════════ */}
          {/* WELCOME SECTION */}
          {/* ═══════════════════════════════════════════════════════════ */}
          <div className="mb-8 rounded-2xl border-2 border-dashed border-white/50 bg-linear-to-r from-black/30 to-black/10 p-6 shadow-xl backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a5faf7]">
              Welcome back
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Maa Vindhyavasini Sweets
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Manage your sweet shop, track orders, and grow your business.
            </p>
          </div>

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* ERROR STATE */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {loadError && (
            <div
              className="mb-6 rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-white/80"
              role="alert"
            >
              <p>{loadError}</p>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* LOADING STATE */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {isLoading ? (
            <div className="rounded-2xl border border-white/15 bg-black/20 px-6 py-16 text-center text-sm text-white/60">
              Loading dashboard...
            </div>
          ) : (
            <>
              {/* ═══════════════════════════════════════════════════════════ */}
              {/* STATS CARDS SECTION */}
              {/* ═══════════════════════════════════════════════════════════ */}
              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Total Orders Card */}
                <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/25 p-5 shadow-lg transition hover:border-white/35">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                        Total Orders
                      </p>
                      <p className="mt-2 text-3xl font-bold text-white">
                        {stats.totalOrders}
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#a5faf7]/10 text-2xl text-[#a5faf7]">
                      <SiEbox />
                    </div>
                  </div>
                </div>

                {/* Total Revenue Card */}
                <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/25 p-5 shadow-lg transition hover:border-white/35">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                        Total Revenue
                      </p>
                      <p className="mt-2 text-2xl font-bold text-white">
                        ₹ {stats.totalRevenue.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl text-emerald-400">
                      <FaRupeeSign />
                    </div>
                  </div>
                </div>

                {/* Pending Orders Card */}
                <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/25 p-5 shadow-lg transition hover:border-white/35">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                        Pending Orders
                      </p>
                      <p className="mt-2 text-3xl font-bold text-white">
                        {stats.pendingOrders}
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-2xl text-amber-400">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 11-2 0 1 1 0 012 0zm-1 4a1 1 0 100 2h.01a1 1 0 100-2H10z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Delivered Orders Card */}
                <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/25 p-5 shadow-lg transition hover:border-white/35">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                        Delivered Orders
                      </p>
                      <p className="mt-2 text-3xl font-bold text-white">
                        {stats.deliveredOrders}
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl text-emerald-400">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════ */}
              {/* CHART SECTION */}
              {/* ═══════════════════════════════════════════════════════════ */}
              <div className="mb-8 rounded-2xl border border-white/15 bg-black/25 p-6 shadow-lg">
                <h2 className="mb-6 text-lg font-bold text-white">
                  Order Status Breakdown
                </h2>
                {chartData.length === 0 ? (
                  <div className="flex h-64 items-center justify-center rounded-xl bg-white/5">
                    <p className="text-center text-white/50">
                      No order statuses available to display
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
                    <div className="relative h-64 w-full max-w-64 shrink-0 sm:h-72 sm:max-w-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius="62%"
                            outerRadius="88%"
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={statusColors[entry.name]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(0, 0, 0, 0.8)",
                              border: "1px solid rgba(165, 250, 247, 0.3)",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                            formatter={(value, name, props) => [
                              `${value} orders`,
                              props.payload.name,
                            ]}
                            labelStyle={{ color: "#a5faf7" }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-white">
                          {stats.totalOrders}
                        </span>
                        <span className="text-xs text-white/50">Total Orders</span>
                      </div>
                    </div>
                    <div className="grid w-full grid-cols-1 gap-2 sm:max-w-sm sm:flex-1">
                      {chartData.map((entry) => (
                        <div
                          key={entry.name}
                          className="flex min-w-0 items-center justify-between gap-3 rounded-lg bg-white/5 px-3 py-2"
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <span
                              className="h-2.5 w-2.5 shrink-0 rounded-full"
                              style={{ backgroundColor: statusColors[entry.name] }}
                            />
                            <span className="truncate text-sm text-white/70">
                              {entry.name}
                            </span>
                          </div>
                          <span className="shrink-0 text-sm font-semibold text-white">
                            {entry.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ═══════════════════════════════════════════════════════════ */}
              {/* RECENTLY ADDED PRODUCTS SECTION */}
              {/* ═══════════════════════════════════════════════════════════ */}
              <div className="mb-8 rounded-2xl border border-white/15 bg-black/25 p-6 shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">
                    Recently Added Products
                  </h2>
                  <button
                    onClick={() => navigate("/lists")}
                    className="text-sm font-semibold text-[#a5faf7] hover:text-white transition"
                  >
                    View All →
                  </button>
                </div>

                {products.length === 0 ? (
                  <div className="flex h-40 items-center justify-center rounded-xl bg-white/5">
                    <p className="text-white/50">No products added yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
                    {products.slice(0, 8).map((product, index) => (
                      <div
                        key={product._id}
                        className={`overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-white/20 ${
                          index >= 4 ? "hidden md:block" : ""
                        }`}
                      >
                        {/* Product Image */}
                        <div className="relative h-40 w-full overflow-hidden bg-black/50">
                          {product.image1 ? (
                            <img
                              src={product.image1}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <SiEbox className="text-3xl text-white/30" />
                            </div>
                          )}
                          {product.bestSeller && (
                            <span className="absolute right-2 top-2 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold text-white">
                              BESTSELLER
                            </span>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="p-3">
                          <p className="line-clamp-2 text-sm font-semibold text-white">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs text-white/50">
                            {product.category}
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <p className="font-bold text-[#a5faf7]">
                              ₹ {product.price}
                            </p>
                            <span className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-white/70">
                              {product.quantity?.length || 0} sizes
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ═══════════════════════════════════════════════════════════ */}
              {/* RECENT ORDERS SECTION */}
              {/* ═══════════════════════════════════════════════════════════ */}
              <div className="mb-8 rounded-2xl border border-white/15 bg-black/25 p-6 shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">
                    Recent Orders
                  </h2>
                  <button
                    onClick={() => navigate("/order")}
                    className="text-sm font-semibold text-[#a5faf7] hover:text-white transition"
                  >
                    View All →
                  </button>
                </div>

                {recentOrders.length === 0 ? (
                  <div className="flex h-40 items-center justify-center rounded-xl bg-white/5">
                    <p className="text-white/50">No orders yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {recentOrders.map((order, index) => (
                      <div
                        key={order._id}
                        className={`overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-white/20 ${
                          index >= 4 ? "hidden md:block" : ""
                        }`}
                      >
                        <div className="border-b border-white/10 bg-white/2.5 px-4 py-3">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                            Order ID
                          </p>
                          <p className="mt-1 truncate font-mono text-xs text-white/75">
                            #{order._id}
                          </p>
                        </div>
                        <div className="p-4">
                          <div className="mb-3">
                            <p className="text-xs text-white/50">Customer</p>
                            <p className="mt-1 truncate font-medium text-white">
                              {order.address?.firstName} {order.address?.lastName}
                            </p>
                          </div>
                          <div className="mb-3 flex items-center justify-between">
                            <div>
                              <p className="text-xs text-white/50">Amount</p>
                              <p className="mt-1 font-bold text-[#a5faf7]">
                                ₹ {Number(order.amount || 0).toLocaleString("en-IN")}
                              </p>
                            </div>
                            <span
                              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
                                statusStyles[order.status] ||
                                "border-white/15 bg-white/5 text-white/70"
                              }`}
                            >
                              {order.status || "Unknown"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ═══════════════════════════════════════════════════════════ */}
              {/* QUICK ACTIONS SECTION */}
              {/* ═══════════════════════════════════════════════════════════ */}
              <div className="rounded-2xl border border-white/15 bg-black/25 p-6 shadow-lg">
                <h2 className="mb-6 text-lg font-bold text-white">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {/* Add New Item Button */}
                  <button
                    onClick={() => navigate("/add")}
                    className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-white/20 bg-white/5 px-6 py-8 text-center transition hover:border-[#a5faf7] hover:bg-white/10 active:scale-95"
                  >
                    <IoMdAddCircleOutline className="text-4xl text-[#a5faf7]" />
                    <span className="font-semibold text-white">Add New Item</span>
                    <span className="text-xs text-white/50">Add products to menu</span>
                  </button>

                  {/* View All Items Button */}
                  <button
                    onClick={() => navigate("/lists")}
                    className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-white/20 bg-white/5 px-6 py-8 text-center transition hover:border-[#a5faf7] hover:bg-white/10 active:scale-95"
                  >
                    <FaRegListAlt className="text-4xl text-[#a5faf7]" />
                    <span className="font-semibold text-white">View All Items</span>
                    <span className="text-xs text-white/50">Manage your menu</span>
                  </button>

                  {/* Manage Orders Button */}
                  <button
                    onClick={() => navigate("/order")}
                    className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-white/20 bg-white/5 px-6 py-8 text-center transition hover:border-[#a5faf7] hover:bg-white/10 active:scale-95"
                  >
                    <SiTicktick className="text-4xl text-[#a5faf7]" />
                    <span className="font-semibold text-white">Manage Orders</span>
                    <span className="text-xs text-white/50">Track & update orders</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;

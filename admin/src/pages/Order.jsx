import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SiEbox } from "react-icons/si";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { authDataContext } from "../context/AuthContext";

const statusStyles = {
  "Order Placed": "border-sky-300/25 bg-sky-300/10 text-sky-200",
  Packing: "border-cyan-300/25 bg-cyan-300/10 text-cyan-200",
  Shipped: "border-violet-300/25 bg-violet-300/10 text-violet-200",
  "Out for delivery": "border-blue-300/25 bg-blue-300/10 text-blue-200",
  Delivered: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState("");
  const [refreshCount, setRefreshCount] = useState(0);
  const { serverUrl } = useContext(authDataContext);

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
              "Unable to load orders. Please try again.",
          );
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    };

    fetchAllOrders();
    return () => {
      isCurrent = false;
    };
  }, [serverUrl, refreshCount]);

  const statusHandler = async (e, orderId) => {
    const status = e.target.value;
    setStatusError("");
    setUpdatingOrderId(orderId);
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/status`,
        { orderId, status },
        { withCredentials: true },
      );
      if (!result.data?.message) {
        throw new Error("The order status could not be confirmed.");
      }
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order,
        ),
      );
    } catch (error) {
      setStatusError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to update order status. Please try again.",
      );
      setIsLoading(true);
      setRefreshCount((count) => count + 1);
    } finally {
      setUpdatingOrderId("");
    }
  };

  const refreshOrders = () => {
    setIsLoading(true);
    setRefreshCount((count) => count + 1);
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-[#0c2025] via-[#10282e] to-[#141414]">
      <Nav />
      <Sidebar />

      <main className="absolute bottom-0 left-0 right-0 top-20 overflow-y-auto overflow-x-hidden pb-24 md:left-[18%] md:pb-0">
        <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-9">
          <header className="mb-6 flex flex-col gap-4 rounded-2xl border-2 border-dashed border-white/50 bg-black/20 p-4 shadow-xl backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a5faf7]">
                Store management
              </p>
              <h1 className="mt-1 font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl">
                All Orders
              </h1>
              <p className="mt-1 text-sm text-white/55">
                Review customer orders and keep delivery status up to date.
              </p>
            </div>
            <div className="flex items-center gap-3 self-start rounded-xl border border-white/15 bg-black/25 px-4 py-3 sm:self-auto">
              <SiEbox className="shrink-0 text-xl text-[#a5faf7]" />
              <div>
                <p className="text-lg font-bold leading-none text-white">{orders.length}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-white/45">
                  {orders.length === 1 ? "Order" : "Orders"}
                </p>
              </div>
            </div>
          </header>

          {statusError && (
            <div
              className="mb-4 flex flex-col gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between"
              role="alert"
            >
              <p>{statusError}</p>
              <button
                type="button"
                onClick={() => setStatusError("")}
                className="self-start font-semibold text-[#a5faf7] hover:text-white sm:self-auto"
              >
                Dismiss
              </button>
            </div>
          )}

          {loadError ? (
            <div
              className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center text-sm text-white/80"
              role="alert"
            >
              <p>{loadError}</p>
              <button
                type="button"
                onClick={refreshOrders}
                disabled={isLoading}
                className="mt-4 rounded-lg border border-white/20 px-4 py-2 font-semibold transition hover:bg-white/10 disabled:opacity-50"
              >
                Try again
              </button>
            </div>
          ) : isLoading ? (
            <div
              className="rounded-2xl border border-white/15 bg-black/20 px-6 py-16 text-center text-sm text-white/60"
              role="status"
            >
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-white/15 bg-black/20 px-6 py-16 text-center">
              <SiEbox className="mx-auto text-4xl text-[#a5faf7]/70" />
              <p className="mt-4 font-semibold text-white/75">No orders yet</p>
              <p className="mt-1 text-sm text-white/45">
                New customer orders will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const currentStatusStyle =
                  statusStyles[order.status] || "border-white/15 bg-white/5 text-white/70";

                return (
                  <article
                    key={order._id}
                    className="overflow-hidden rounded-2xl border border-white/15 bg-black/25 shadow-lg shadow-black/10 transition-colors hover:border-white/35"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.025] px-4 py-3 sm:px-5">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                          <SiEbox className="text-lg text-[#a5faf7]" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                            Order
                          </p>
                          <p className="truncate font-mono text-xs text-white/75 sm:text-sm">
                            #{order._id}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${currentStatusStyle}`}
                      >
                        {order.status || "Status unavailable"}
                      </span>
                    </div>

                    <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(220px,0.8fr)_minmax(200px,0.7fr)] lg:gap-6">
                      <section className="min-w-0">
                        <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#a5faf7]">
                          Items & delivery
                        </h2>
                        <div className="space-y-2">
                          {(order.items || []).map((item, index) => (
                            <div
                              key={`${item._id || item.name}-${item.size}-${index}`}
                              className="flex items-start justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.035] px-3 py-2.5"
                            >
                              <p className="min-w-0 wrap-break-word text-sm font-medium text-white/85">
                                {item.name || "Product"}{" "}
                                <span className="text-white/50">× {item.quantity}</span>
                              </p>
                              <span className="shrink-0 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-white/75">
                                {item.size}
                              </span>
                            </div>
                          ))}
                          {order.items?.length === 0 && (
                            <p className="text-sm text-white/45">No item details available.</p>
                          )}
                        </div>

                        <div className="mt-4 rounded-xl border border-white/5 bg-white/2.5 p-3 text-sm leading-relaxed">
                          <p className="font-semibold text-white">
                            {order.address?.firstName} {order.address?.lastName}
                          </p>
                          <p className="mt-1 wrap-break-word text-white/60">
                            {[order.address?.street, order.address?.city, order.address?.state, order.address?.country, order.address?.pincode]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                          {order.address?.phone && (
                            <p className="mt-1 text-white/60">{order.address.phone}</p>
                          )}
                        </div>
                      </section>

                      <section className="border-t border-white/10 pt-4 sm:border-t-0 sm:pt-0 lg:border-l lg:border-white/10 lg:pl-5">
                        <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#a5faf7]">
                          Order details
                        </h2>
                        <dl className="space-y-2.5 text-sm">
                          <div className="flex justify-between gap-3">
                            <dt className="text-white/50">Items</dt>
                            <dd className="text-right font-medium text-white/85">
                              {(order.items || []).reduce(
                                (count, item) => count + Number(item.quantity || 0),
                                0,
                              )}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-3">
                            <dt className="text-white/50">Payment method</dt>
                            <dd className="text-right font-medium text-white/85">
                              {order.paymentMethod || "—"}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-3">
                            <dt className="text-white/50">Payment</dt>
                            <dd
                              className={`text-right font-semibold ${order.payment ? "text-emerald-300" : "text-white/70"}`}
                            >
                              {order.payment ? "Paid" : "Pending"}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-3">
                            <dt className="text-white/50">Order date</dt>
                            <dd className="text-right text-white/80">
                              {order.date
                                ? new Date(order.date).toLocaleDateString()
                                : "—"}
                            </dd>
                          </div>
                        </dl>
                        <div className="mt-4 border-t border-white/10 pt-3">
                          <p className="text-xs uppercase tracking-wider text-white/45">Order total</p>
                          <p className="mt-1 text-xl font-bold text-[#a5faf7]">
                            ₹ {Number(order.amount || 0).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </section>

                      <section className="border-t border-white/10 pt-4 sm:border-t-0 sm:pt-0 lg:border-l lg:border-white/10 lg:pl-5">
                        <label
                          htmlFor={`status-${order._id}`}
                          className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#a5faf7]"
                        >
                          Update status
                        </label>
                        <select
                          id={`status-${order._id}`}
                          value={order.status}
                          disabled={updatingOrderId === order._id}
                          onChange={(e) => statusHandler(e, order._id)}
                          className="w-full rounded-xl border border-white/20 bg-[#111d20] px-3 py-3 text-sm font-medium text-white outline-none transition focus:border-[#a5faf7] focus:ring-2 focus:ring-[#a5faf7]/20 disabled:cursor-wait disabled:opacity-60"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Packing">Packing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for delivery">Out for delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <p className="mt-2 text-xs leading-relaxed text-white/40">
                          {updatingOrderId === order._id
                            ? "Saving status..."
                            : "Changes are saved to this order."}
                        </p>
                      </section>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Order;

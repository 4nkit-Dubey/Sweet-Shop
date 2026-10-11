import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import { authDataContext } from "../contexts/AuthContext";
import { shopDataContext } from "../contexts/ShopContext";

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [refreshCount, setRefreshCount] = useState(0);
  const { currency } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);

  useEffect(() => {
    let isCurrent = true;
    const loadOrdersData = async () => {
      try {
        const result = await axios.post(
          `${serverUrl}/api/order/userorder`,
          {},
          { withCredentials: true },
        );

        if (!Array.isArray(result.data)) {
          throw new Error(
            "The order list could not be loaded. Please try again.",
          );
        }

        const allOrderItems = result.data.flatMap((order) => {
          if (!Array.isArray(order.items)) {
            throw new Error("The order data is incomplete. Please try again.");
          }

          return order.items.map((item, index) => ({
            ...item,
            orderId: order._id,
            itemKey: `${order._id ?? order.date}-${item._id ?? item.name}-${item.size}-${index}`,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
          }));
        });

        allOrderItems.sort(
          (first, second) => Number(second.date) - Number(first.date),
        );
        if (isCurrent) {
          setOrderData(allOrderItems);
          setLoadError("");
        }
      } catch (error) {
        if (isCurrent) {
          setLoadError(
            error?.response?.data?.message ||
              error?.message ||
              "Unable to load your orders. Please try again.",
          );
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    };

    loadOrdersData();
    return () => {
      isCurrent = false;
    };
  }, [serverUrl, refreshCount]);

  const refreshOrders = () => {
    setIsLoading(true);
    setRefreshCount((count) => count + 1);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#0c2025] via-[#102b32] to-[#141414] px-4 pb-28 pt-[calc(80px+2rem)] sm:px-6 sm:pt-[calc(12vh+2rem)] lg:px-8 lg:pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 sm:mb-10">
          <Title text1="MY" text2="ORDERS" />
          <p className="mx-auto max-w-xl text-center text-sm text-white/55 sm:text-base">
            Keep track of your recent sweet-shop orders.
          </p>
        </div>

        {loadError && (
          <div
            className="mb-5 flex flex-col gap-3 rounded-2xl border border-red-400/25 bg-red-400/10 p-4 text-sm text-red-200 sm:flex-row sm:items-center sm:justify-between"
            role="alert"
          >
            <p>{loadError}</p>
            <button
              type="button"
              onClick={refreshOrders}
              disabled={isLoading}
              className="shrink-0 rounded-lg border border-red-200/20 px-4 py-2 font-semibold transition hover:bg-red-200/10 disabled:opacity-50"
            >
              Try again
            </button>
          </div>
        )}

        {isLoading ? (
          <div
            className="rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center text-white/60 backdrop-blur-sm"
            role="status"
          >
            Loading your orders...
          </div>
        ) : orderData.length === 0 && !loadError ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center backdrop-blur-sm">
            <p className="text-xl font-semibold text-white sm:text-2xl">
              No orders yet
            </p>
            <p className="mt-2 text-sm text-white/55">
              Your orders will show up here after checkout.
            </p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5">
            {orderData.map((item) => (
              <article
                key={item.itemKey}
                className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-sm transition-colors hover:border-[#a5faf7]/20 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                  <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:h-32 sm:w-32">
                    {item.image1 ? (
                      <img
                        src={item.image1}
                        alt={item.name || "Ordered product"}
                        width="128"
                        height="128"
                        className="block h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-white/35">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h2 className="truncate text-lg font-bold text-[#c3f6ca] sm:text-xl">
                          {item.name}
                        </h2>
                        <p className="mt-1 text-sm font-semibold text-[#a5faf7]">
                          {currency}
                          {item.price}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="inline-flex min-h-7 items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/65">
                          {item.paymentMethod}
                        </span>
                        <span
                          className={`inline-flex min-h-7 items-center rounded-full border px-3 py-1.5 ${
                            item.payment
                              ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200"
                              : "border-amber-300/20 bg-amber-300/10 text-amber-100"
                          }`}
                        >
                          {item.payment ? "Paid" : "Payment pending"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs sm:gap-3 sm:text-sm">
                      <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-white/60">
                        Quantity
                        <strong className="font-semibold text-white/90">
                          {item.quantity}
                        </strong>
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-white/60">
                        Size
                        <strong className="font-semibold text-white/90">
                          {item.size}
                        </strong>
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-white/60">
                        Ordered
                        <strong className="font-semibold text-white/90">
                          {new Date(item.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </strong>
                      </span>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-h-8 items-center gap-2 text-sm">
                        <span className="relative inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/50" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        </span>
                        <span className="text-white/60">Status:</span>
                        <span className="font-semibold text-white">
                          {item.status}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={refreshOrders}
                        disabled={isLoading}
                        className="rounded-xl border border-[#a5faf7]/25 px-4 py-2.5 text-sm font-semibold text-[#a5faf7] transition hover:border-[#a5faf7]/60 hover:bg-[#a5faf7]/10 disabled:cursor-wait disabled:opacity-50"
                      >
                        {isLoading ? "Refreshing..." : "Refresh status"}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Order;

import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import Title from "../components/Title";
import razorpay from "../assets/razorpay.webp";
import { authDataContext } from "../contexts/AuthContext";
import { shopDataContext } from "../contexts/ShopContext";

const inputClassName =
  "w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#a5faf7] focus:ring-2 focus:ring-[#a5faf7]/15";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartItem, setCartItem, getCartAmount, delivery_Fee, products, currency } =
    useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [pendingPayment, setPendingPayment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const cartLines = Object.entries(cartItem).flatMap(([productId, sizes]) =>
    Object.entries(sizes)
      .filter(([, quantity]) => quantity > 0)
      .map(([size, quantity]) => ({
        product: products.find((product) => product._id === productId),
        size,
        quantity,
      })),
  );
  const itemCount = cartLines.reduce((total, line) => total + line.quantity, 0);
  const subtotal = getCartAmount();
  const total = itemCount > 0 ? subtotal + delivery_Fee : 0;
  const hasUnavailableProducts = cartLines.some((line) => !line.product);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const verifyPayment = async (paymentResponse) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const verification = await axios.post(
        `${serverUrl}/api/order/razorpay/verify`,
        paymentResponse,
        { withCredentials: true },
      );
      if (!verification.data?.message) {
        throw new Error("Payment could not be verified. Please retry verification.");
      }
      setPendingPayment(null);
      setCartItem({});
      navigate("/order");
    } catch (error) {
      setPendingPayment(paymentResponse);
      setSubmitError(
        error?.response?.data?.message ||
          error?.message ||
          "Payment verification failed. Please retry verification.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (itemCount === 0) {
      setSubmitError("Your cart is empty. Add items before placing an order.");
      return;
    }

    if (hasUnavailableProducts) {
      setSubmitError("One or more cart items are unavailable. Please update your cart and try again.");
      return;
    }

    setIsSubmitting(true);
    let checkoutOpened = false;
    try {
      const orderItems = cartLines.map(({ product, size, quantity }) => ({
        ...product,
        size,
        quantity,
      }));
      const orderData = {
        address: formData,
        items: orderItems,
        amount: total,
      };
      if (paymentMethod === "cod") {
        const result = await axios.post(
          `${serverUrl}/api/order/placeorder`,
          orderData,
          { withCredentials: true },
        );
        if (!result.data?.message) {
          throw new Error("The order could not be confirmed. Please try again.");
        }
        setCartItem({});
        navigate("/order");
        return;
      }

      if (!window.Razorpay) {
        throw new Error("Razorpay checkout did not load. Please refresh and try again.");
      }

      const result = await axios.post(
        `${serverUrl}/api/order/razorpay`,
        orderData,
        { withCredentials: true },
      );
      const { order, keyId } = result.data || {};
      if (!order?.id || !keyId) {
        throw new Error("Unable to start Razorpay checkout. Please try again.");
      }

      const checkout = new window.Razorpay({
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Maa Vindhyavasini Sweets",
        description: "Order payment",
        order_id: order.id,
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          shippingAddress: `${formData.street}, ${formData.city}, ${formData.state}, ${formData.pincode}`,
        },
        theme: { color: "#0f5b5c" },
        handler: async (response) => {
          setPendingPayment(response);
          await verifyPayment(response);
        },
        modal: {
          ondismiss: () => setIsSubmitting(false),
        },
      });

      checkout.on("payment.failed", (response) => {
        setSubmitError(
          response.error?.description ||
            "Payment failed. Your cart is still available to retry.",
        );
        setIsSubmitting(false);
      });
      checkout.open();
      checkoutOpened = true;
    } catch (error) {
      setSubmitError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to place your order. Please try again.",
      );
    } finally {
      if (!checkoutOpened) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#0c2025] via-[#102b32] to-[#141414] px-4 pb-28 pt-[calc(80px+2rem)] sm:px-6 sm:pt-[calc(12vh+2rem)] lg:px-8 lg:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-10">
          <Title text1="CHECK" text2="OUT" />
          <p className="mx-auto max-w-xl text-center text-sm text-white/55 sm:text-base">
            Add your delivery details and choose how you&apos;d like to pay.
          </p>
        </div>

        {itemCount === 0 ? (
          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-white/10 bg-white/5 px-6 py-14 text-center backdrop-blur-sm sm:py-16">
            <p className="text-xl font-semibold text-white sm:text-2xl">Your cart is empty</p>
            <p className="mt-2 text-sm text-white/55">Add something sweet before checking out.</p>
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="mt-6 rounded-xl bg-[#a5faf7] px-6 py-3 font-bold text-[#0c2025] transition hover:bg-[#a5faf7]/90"
            >
              Back to cart
            </button>
          </div>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)] lg:gap-8">
            <form
              onSubmit={onSubmitHandler}
              className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm sm:p-7 lg:p-8"
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#c3f6ca] sm:text-2xl">
                  Delivery information
                </h2>
                <p className="mt-1 text-sm text-white/50">Where should we deliver your order?</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-white/70">
                  First name
                  <input
                    type="text"
                    placeholder="First name"
                    autoComplete="given-name"
                    required
                    onChange={onChangeHandler}
                    name="firstName"
                    value={formData.firstName}
                    className={inputClassName}
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-white/70">
                  Last name
                  <input
                    type="text"
                    placeholder="Last name"
                    autoComplete="family-name"
                    required
                    onChange={onChangeHandler}
                    name="lastName"
                    value={formData.lastName}
                    className={inputClassName}
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-white/70 sm:col-span-2">
                  Email address
                  <input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    onChange={onChangeHandler}
                    name="email"
                    value={formData.email}
                    className={inputClassName}
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-white/70 sm:col-span-2">
                  Street address
                  <input
                    type="text"
                    placeholder="House number and street"
                    autoComplete="street-address"
                    required
                    onChange={onChangeHandler}
                    name="street"
                    value={formData.street}
                    className={inputClassName}
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-white/70">
                  City
                  <input
                    type="text"
                    placeholder="City"
                    autoComplete="address-level2"
                    required
                    onChange={onChangeHandler}
                    name="city"
                    value={formData.city}
                    className={inputClassName}
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-white/70">
                  State
                  <input
                    type="text"
                    placeholder="State"
                    autoComplete="address-level1"
                    required
                    onChange={onChangeHandler}
                    name="state"
                    value={formData.state}
                    className={inputClassName}
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-white/70">
                  PIN code
                  <input
                    type="text"
                    placeholder="PIN code"
                    autoComplete="postal-code"
                    required
                    onChange={onChangeHandler}
                    name="pincode"
                    value={formData.pincode}
                    className={inputClassName}
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-white/70">
                  Country
                  <input
                    type="text"
                    placeholder="Country"
                    autoComplete="country-name"
                    required
                    onChange={onChangeHandler}
                    name="country"
                    value={formData.country}
                    className={inputClassName}
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-white/70 sm:col-span-2">
                  Phone number
                  <input
                    type="tel"
                    placeholder="Phone number"
                    autoComplete="tel"
                    required
                    onChange={onChangeHandler}
                    name="phone"
                    value={formData.phone}
                    className={inputClassName}
                  />
                </label>
              </div>

              {hasUnavailableProducts && (
                <p className="mt-5 rounded-xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100" role="alert">
                  One or more cart items are unavailable. Please update your cart before checkout.
                </p>
              )}
              {submitError && (
                <div className="mt-5 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-200" role="alert">
                  <p>{submitError}</p>
                  {pendingPayment && (
                    <button
                      type="button"
                      onClick={() => verifyPayment(pendingPayment)}
                      disabled={isSubmitting}
                      className="mt-3 rounded-lg border border-red-200/30 px-3 py-2 text-xs font-semibold transition hover:bg-red-200/10 disabled:opacity-50"
                    >
                      {isSubmitting ? "VERIFYING..." : "RETRY PAYMENT VERIFICATION"}
                    </button>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || hasUnavailableProducts}
                className="mt-7 w-full rounded-xl bg-[#a5faf7] px-6 py-3.5 font-bold text-[#0c2025] shadow-[0_0_18px_rgba(165,250,247,0.2)] transition hover:bg-[#a5faf7]/90 hover:shadow-[0_0_24px_rgba(165,250,247,0.35)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-56"
              >
                {isSubmitting
                  ? paymentMethod === "cod"
                    ? "PLACING ORDER..."
                    : "OPENING SECURE CHECKOUT..."
                  : paymentMethod === "cod"
                    ? "PLACE ORDER"
                    : "PAY SECURELY"}
              </button>
            </form>

            <aside className="space-y-5 lg:sticky lg:top-24">
              <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm sm:p-7">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#c3f6ca]">Order summary</h2>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
                  {cartLines.map(({ product, size, quantity }, index) => (
                    <div
                      key={`${product?._id ?? "unavailable"}-${size}-${index}`}
                      className="flex items-start justify-between gap-3 border-b border-white/10 pb-3 last:border-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                          {product?.name ?? "Unavailable item"}
                        </p>
                        <p className="mt-1 text-xs text-white/50">
                          Size: {size} <span className="mx-1">·</span> Qty: {quantity}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-semibold text-[#a5faf7]">
                        {currency}{product ? product.price * quantity : "—"}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-3 border-t border-white/10 pt-4 text-sm">
                  <div className="flex justify-between gap-4 text-white/65">
                    <span>Subtotal</span>
                    <span>{currency}{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between gap-4 text-white/65">
                    <span>Delivery</span>
                    <span>{currency}{delivery_Fee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-white/10 pt-4 text-base font-bold text-[#c3f6ca]">
                    <span>Total</span>
                    <span>{currency}{total.toFixed(2)}</span>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm sm:p-7">
                <h2 className="mb-4 text-lg font-bold text-[#c3f6ca]">Payment method</h2>
                <div className="space-y-3">
                  <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-colors ${
                    paymentMethod === "cod"
                      ? "border-[#a5faf7]/40 bg-[#a5faf7]/[0.07]"
                      : "border-white/10 bg-black/10 hover:border-white/25"
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      aria-label="Cash on delivery"
                      className="accent-[#a5faf7]"
                    />
                    <TbTruckDelivery className="shrink-0 text-2xl text-[#a5faf7]" />
                    <span className="text-sm font-semibold text-white">Cash on delivery</span>
                    {paymentMethod === "cod" && (
                      <span className="ml-auto rounded-full bg-[#a5faf7]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#a5faf7]">
                        Selected
                      </span>
                    )}
                  </label>
                  <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-colors ${
                    paymentMethod === "razorpay"
                      ? "border-[#a5faf7]/40 bg-[#a5faf7]/[0.07]"
                      : "border-white/10 bg-black/10 hover:border-white/25"
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={() => setPaymentMethod("razorpay")}
                      aria-label="Pay online with Razorpay"
                      className="accent-[#a5faf7]"
                    />
                    <img src={razorpay} alt="Razorpay" className="h-6 w-20 object-contain" />
                    <span className="text-sm font-semibold text-white">Pay online</span>
                    {paymentMethod === "razorpay" && (
                      <span className="ml-auto rounded-full bg-[#a5faf7]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#a5faf7]">
                        Selected
                      </span>
                    )}
                  </label>
                </div>
              </section>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default PlaceOrder;

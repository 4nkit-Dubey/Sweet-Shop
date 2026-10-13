import Title from "../components/Title";
import { useContext } from "react";
import { toast } from "sonner";
import { shopDataContext } from "../contexts/ShopContext";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItem, updateQuantity } =
    useContext(shopDataContext);
  const navigate = useNavigate();
  const cartData = [];
  for (const items in cartItem) {
    for (const item in cartItem[items]) {
      if (cartItem[items][item] > 0) {
        cartData.push({
          _id: items,
          size: item,
          quantity: cartItem[items][item],
        });
      }
    }
  }

  const handleRemoveItem = (productId, size) => {
    updateQuantity(productId, size, 0);
    toast.success("Item removed from cart ✓");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#0c2025] via-[#0f2a31] to-[#141414] overflow-x-hidden">
      {/* Spacer for fixed navbar */}
      <div className="h-[10vh] min-h-[80px] w-full shrink-0 sm:h-[12vh]" />

      {/* Main container */}
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-28 sm:px-6 sm:pt-10 lg:px-8 lg:pb-16 lg:pt-16">
        {/* Title */}
        <div className="mb-8 sm:mb-12">
          <Title text1={"YOUR"} text2={"CART"} />
        </div>

        {/* Cart Items Section */}
        {cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center backdrop-blur-sm sm:py-24">
            <p className="mb-3 text-xl font-semibold text-white sm:text-2xl">Your cart is empty</p>
            <p className="mb-7 max-w-sm text-sm leading-relaxed text-white/55 sm:text-base">
              Treat yourself to something sweet — your next favourite is waiting.
            </p>
            <button
              onClick={() => navigate("/")}
              className="rounded-xl bg-[#a5faf7] px-6 py-3 font-bold text-[#0c2025] shadow-[0_0_15px_rgba(165,250,247,0.3)] transition-all duration-300 hover:bg-[#a5faf7]/90 hover:shadow-[0_0_20px_rgba(165,250,247,0.5)] sm:px-8"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2">
              <div className="space-y-3 sm:space-y-4">
                {cartData.map((item, index) => {
                  const productData = products.find(
                    (product) => product._id === item._id,
                  );
                  if (!productData) return null;

                  return (
                    <div
                      key={index}
                      className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#a5faf7]/25 hover:bg-white/[0.07] sm:gap-5 sm:p-5"
                    >
                      {/* Product Image */}
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:h-24 sm:w-24">
                        <img
                          src={productData.image1}
                          alt={productData.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                        <div className="flex min-w-0 items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="truncate pr-1 text-base font-bold text-[#c3f6ca] sm:text-lg">
                              {productData.name}
                            </h3>
                            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm sm:gap-3">
                              <p className="font-semibold text-[#a5faf7]">
                                {currency}{productData.price}
                              </p>
                              <span className="rounded-lg border border-white/15 px-2.5 py-1 text-xs text-white/65 sm:text-sm">
                                Size: {item.size}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item._id, item.size)}
                            className="shrink-0 rounded-lg p-2 text-white/50 transition-colors hover:bg-red-400/10 hover:text-red-400"
                            aria-label={`Remove ${productData.name} from cart`}
                          >
                            <RiDeleteBin5Line size={20} />
                          </button>
                        </div>

                        <div className="flex flex-wrap items-end justify-between gap-3">
                          <label className="flex items-center gap-2 text-xs font-medium text-white/55 sm:text-sm">
                            Qty
                            <input
                              type="number"
                              min={1}
                              defaultValue={item.quantity}
                              onChange={(e) =>
                                e.target.value === "" || e.target.value === "0"
                                  ? null
                                  : updateQuantity(
                                      item._id,
                                      item.size,
                                      Number(e.target.value),
                                    )
                              }
                              className="w-16 rounded-lg border border-white/15 bg-black/30 px-2 py-2 text-center text-sm text-[#a5faf7] transition-colors focus:border-[#a5faf7] focus:outline-none"
                            />
                          </label>
                          <p className="text-sm font-semibold text-white/80 sm:text-base">
                            <span className="mr-2 text-xs font-normal text-white/45">Item total</span>
                            {currency}{productData.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cart Total Sidebar */}
            <div className="lg:sticky lg:top-24 lg:col-span-1">
              <CartTotal />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

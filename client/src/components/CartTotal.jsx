import { useContext } from "react";
import { shopDataContext } from "../contexts/ShopContext";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const { currency, delivery_Fee, getCartAmount, cartItem } = useContext(shopDataContext);
  const navigate = useNavigate();
  const cartLength = Object.keys(cartItem).length;

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8">
      <div className="mb-8">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>

      <div className="space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <p className="text-sm sm:text-base text-white/70">Subtotal</p>
          <p className="text-sm sm:text-base font-semibold text-[#a5faf7]">
            {currency} {getCartAmount()}.00
          </p>
        </div>

        {/* Shipping Fee */}
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <p className="text-sm sm:text-base text-white/70">Shipping Fee</p>
          <p className="text-sm sm:text-base font-semibold text-[#a5faf7]">
            {currency} {delivery_Fee}.00
          </p>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-2">
          <p className="text-base sm:text-lg font-bold text-[#c3f6ca]">Total</p>
          <p className="text-base sm:text-lg font-bold text-[#c3f6ca]">
            {currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_Fee}.00
          </p>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => {
          if (cartLength > 0) {
            navigate("/placeorder");
          }
        }}
        disabled={cartLength === 0}
        className={`w-full mt-8 py-3 sm:py-4 px-6 font-bold rounded-xl transition-all duration-300 text-base sm:text-lg ${
          cartLength > 0
            ? "bg-[#a5faf7] text-[#0c2025] hover:bg-[#a5faf7]/90 shadow-[0_0_15px_rgba(165,250,247,0.3)] hover:shadow-[0_0_20px_rgba(165,250,247,0.5)]"
            : "bg-white/10 text-white/40 cursor-not-allowed"
        }`}
      >
        PROCEED TO CHECKOUT
      </button>

      {/* Info text */}
      {cartLength === 0 && (
        <p className="text-xs sm:text-sm text-white/50 text-center mt-4">
          Add items to your cart to proceed
        </p>
      )}
    </div>
  );
};

export default CartTotal;

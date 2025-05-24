// src/components/OrderSummaryCheckout.jsx
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { useNavigate } from "react-router-dom";

const OrderSummaryCheckout = () => {
  const { subtotal } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(subtotal);
  const navigate = useNavigate();

  const availableCoupons = {
    DISCOUNT10: 10,
    SAVE20: 20,
  };

  const handleApplyCoupon = () => {
    const discountPercent = availableCoupons[couponCode.toUpperCase()];
    if (discountPercent) {
      setAppliedCoupon({
        code: couponCode.toUpperCase(),
        discountPercentage: discountPercent,
      });
    } else {
      alert("Invalid coupon code");
      setAppliedCoupon(null);
      setDiscountAmount(0);
      setTotalAfterDiscount(subtotal);
    }
  };

  useEffect(() => {
    if (appliedCoupon) {
      const discount = (subtotal * appliedCoupon.discountPercentage) / 100;
      setDiscountAmount(discount);
      setTotalAfterDiscount(subtotal - discount);
    } else {
      setDiscountAmount(0);
      setTotalAfterDiscount(subtotal);
    }
  }, [appliedCoupon, subtotal]);

  const formatCurrency = (amount) =>
    amount.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    });

  return (
    <div className="rounded-lg bg-gray-800 p-6 shadow-md space-y-4">
      <h2 className="text-xl font-bold text-white">Order Summary</h2>

      <p className="text-gray-300">Subtotal: {formatCurrency(subtotal)}</p>

      <div>
        <label htmlFor="coupon" className="block mb-1 text-gray-300">
          Coupon Code
        </label>
        <input
          id="coupon"
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          className="w-full rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          onClick={handleApplyCoupon}
          className="mt-2 rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          Apply Coupon
        </button>
      </div>

      {appliedCoupon && (
        <p className="text-emerald-400">
          Coupon <strong>{appliedCoupon.code}</strong> applied: -{appliedCoupon.discountPercentage}%
        </p>
      )}

      <p className="text-lg font-semibold text-white">
        Total: <span className="text-emerald-400">{formatCurrency(totalAfterDiscount)}</span>
      </p>

      <button
        onClick={() => navigate("/cart")}
        className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700 disabled:opacity-50 "
      >
        Back to Cart 
      </button>
    </div>
  );
};

export default OrderSummaryCheckout;

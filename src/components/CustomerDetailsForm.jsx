import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../lib/axios";
import { useCartStore } from "../stores/useCartStore";
import {toast} from "react-hot-toast";


const CustomerDetailsForm = () => {


  const { cart, total, coupon } = useCartStore();

  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!customer.fullName) newErrors.fullName = "Full name is required";
    if (!customer.email) newErrors.email = "Email is required";
    if (!customer.phone) newErrors.phone = "Phone number is required";
    if (!customer.address) newErrors.address = "Address is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "/payments/create-checkout-session",
        {
          products: cart,
          couponCode: coupon ? coupon.code : null,
          customerDetails: customer,
        },
        { withCredentials: true }
      );
      console.log("Sending customer details:", customer);


      const { paymentLink } = res.data;
      if (!paymentLink) throw new Error("Payment link not returned");

      window.location.href = paymentLink;
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error?.response?.data?.error || error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      className="space-y-4 bg-gray-800 border border-gray-700 p-4 rounded-lg"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="text-xl font-semibold text-emerald-400">Customer Details</p>

      {["fullName", "email", "phone", "address"].map((field) => (
        <div key={field}>
          <label className="block text-sm text-white capitalize">{field}</label>
          <input
            type="text"
            name={field}
            value={customer[field]}
            onChange={handleChange}
            className="w-full rounded bg-gray-700 p-2 text-white outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder={`Enter your ${field}`}
          />
          {errors[field] && (
            <p className="text-sm text-red-400 mt-1">{errors[field]}</p>
          )}
        </div>
      ))}

      <motion.button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700 disabled:opacity-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? "Processing..." : "Continue to Payment"}
      </motion.button>
    </motion.form>
  );
};

export default CustomerDetailsForm;

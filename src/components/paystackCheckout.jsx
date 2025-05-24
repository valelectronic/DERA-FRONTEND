import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import axios from "axios";

const PaystackCheckout = ({ cart, customerInfo, coupon }) => {
  const [loading, setLoading] = useState(false);

  const createOrderOnBackend = async () => {
    try {
      const { data } = await axios.post(
        "/api/orders/create-order",
        {
          products: cart,
          customerInfo,
          couponCode: coupon?.code || null,
        },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.error("Create order error:", error);
      alert("Failed to create order");
      return null;
    }
  };

  const handlePayment = async () => {
    setLoading(true);

    const orderData = await createOrderOnBackend();
    if (!orderData) {
      setLoading(false);
      return;
    }

    const paystackConfig = {
      reference: orderData.paystackReference,
      email: customerInfo.email,
      amount: orderData.totalAmount * 100, // convert to kobo
      publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
      metadata: {
        customerName: customerInfo.name,
        phone: customerInfo.phone,
        address: customerInfo.address,
        couponCode: coupon?.code || "",
      },
    };

    const initializePayment = usePaystackPayment(paystackConfig);

    const onSuccess = async (reference) => {
      try {
        const verifyResponse = await axios.post(
          "/api/orders/verify-paystack",
          { reference: reference.reference },
          { withCredentials: true }
        );

        alert(verifyResponse.data.message);
        setLoading(false);
        // You can redirect or update UI here after success
      } catch (verifyError) {
        alert("Payment verification failed");
        setLoading(false);
      }
    };

    const onClose = () => {
      alert("Payment closed.");
      setLoading(false);
    };

    initializePayment(onSuccess, onClose);
  };

  return (
    <button onClick={handlePayment} disabled={loading}>
      {loading ? "Processing..." : "Pay with Paystack"}
    </button>
  );
};

export default PaystackCheckout;

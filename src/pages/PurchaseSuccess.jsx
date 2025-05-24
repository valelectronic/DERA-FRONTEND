import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../lib/axios";

const PurchaseSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.post("/api/verifyPayment/verify", { reference }, { withCredentials: true });
        if (res.data.status === "success") {
          setStatus("success");
        } else {
          navigate("/cancel");
        }
      } catch (error) {
        console.error("Verification error:", error);
        navigate("/cancel");
      }
    };

    if (reference) {
      verifyPayment();
    } else {
      navigate("/cancel");
    }
  }, [reference]);

  if (status === "verifying") return <p className="text-white text-center">Verifying payment...</p>;
  if (status === "success") return <p className="text-green-500 text-center">🎉 Payment successful! Thank you for your order.</p>;

  return null;
};

export default PurchaseSuccess;

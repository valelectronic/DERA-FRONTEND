import OrderSummaryCheckout from "../components/OrderSummaryCheckout";
import CustomerDetailsForm from "../components/CustomerDetailsForm";

const Checkout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6 text-center">Checkout</h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ✅ Use the dedicated OrderSummaryCheckout here */}
        <OrderSummaryCheckout />
            
        {/* ✅ Only user detail form here */}
        <div className="space-y-6">
         
          <CustomerDetailsForm />
        </div>
      </div>
    </div>
  );
};

export default Checkout;

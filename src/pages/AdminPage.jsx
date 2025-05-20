import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        <motion.h1
          className="text-3xl sm:text-4xl font-bold mb-8 text-emerald-400 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>

        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center rounded-md transition-colors duration-200
                px-3 py-1.5
                text-xs sm:text-sm
                ${
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }
              `}
            >
              <tab.icon
                className={`mr-1 sm:mr-2
                  h-4 w-4 sm:h-5 sm:w-5
                `}
              />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
};

export default AdminPage;

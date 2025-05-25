import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const CustomerSupportWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="fixed bottom-5 right-5 z-[9999] bg-green-500 hover:bg-green-600 text-white p-4 rounded-2xl shadow-xl"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </motion.button>

      {/* WhatsApp Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-5 z-[9999] bg-white text-gray-800 p-4 rounded-2xl shadow-2xl w-72"
            style={{ pointerEvents: "auto" }}
          >
            <h4 className="font-bold text-lg mb-2">Need help?</h4>
            <p className="text-sm mb-4">
              Chat with our customer support team on WhatsApp for instant help.
            </p>
            <a
              href="https://wa.me/2349063087928?text=Hi%20there%2C%20I%20need%20help"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded-xl transition"
              style={{ pointerEvents: "auto" }}
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomerSupportWidget;

import { useState } from "react";
import { motion } from "framer-motion";
import { Trash, Star, Pencil } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete._id);
      setShowConfirm(false);
      setProductToDelete(null);
    }
  };

  return (
    <motion.div
      className=' shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto w-full p-4'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {products?.map((product) => (
          <div
            key={product._id}
            className='bg-gray-900 p-5 rounded-xl shadow flex flex-col sm:flex-row sm:items-center gap-5'
          >
            <img
              src={product.image}
              alt={product.name}
              loading="eager"
              className='h-24 w-24 rounded-lg object-cover flex-shrink-0'
            />

            <div className='flex-1'>
              <div className='text-white text-xl font-semibold truncate'>{product.name}</div>
              <div className='text-green-400 text-base mt-1'>
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 2,
                }).format(product.price)}
              </div>
              <div className='flex items-center gap-2 text-sm mt-1 font-medium'>
                <span
                  className={`h-2 w-2 rounded-full ${
                    product.stock > 0 ? "bg-green-400" : "bg-red-400"
                  }`}
                ></span>
                <span className={product.stock > 0 ? "text-green-400" : "text-red-400"}>
                  {product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}
                </span>
              </div>

              <div className='flex items-center gap-4 mt-4'>
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-2 rounded-full ${
                    product.isFeatured
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-gray-600 text-gray-300"
                  } hover:bg-yellow-500 transition-colors duration-200`}
                >
                  <Star className='h-5 w-5' />
                </button>

                <button
                  onClick={() => navigate(`/EditingPage/${product._id}`)}
                  className='text-blue-400 hover:text-blue-300 p-2'
                >
                  <Pencil className='h-5 w-5' />
                </button>

                <button
                  onClick={() => confirmDelete(product)}
                  className='text-red-400 hover:text-red-300 p-2'
                >
                  <Trash className='h-5 w-5' />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
    {showConfirm && (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="bg-gray-900 text-white rounded-2xl p-5 sm:p-6 w-full max-w-sm shadow-xl border border-gray-700"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-bold mb-3 text-white">Delete Product?</h2>
      <p className="text-gray-300 text-sm sm:text-base">
        Are you sure you want to delete{" "}
        <span className="text-red-400 font-medium">{productToDelete?.name}</span>?
      </p>

      <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
        <button
          onClick={() => setShowConfirm(false)}
          className="px-4 py-2 rounded-lg text-sm bg-gray-700 hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-lg text-sm bg-red-600 hover:bg-red-500 transition text-white"
        >
          Yes, Delete
        </button>
      </div>
    </motion.div>
  </motion.div>
)}


    </motion.div>
  );
};

export default ProductsList;
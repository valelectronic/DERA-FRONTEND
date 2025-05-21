import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { toast } from "react-hot-toast";
import { useProductStore } from "../stores/useProductStore";


const categories = [
  "earPod", "keyboard", "laptopStand", "leadStrip", "powerbank", "projector",
  "smartWatch", "usbHub", "wirelessCharger",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const {createProduct} = useProductStore()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
    createProduct(newProduct)
    setNewProduct({"name" : "", "description" : "", "price" : "", "category" : "", "image" : ""})
      toast.success("Product created successfully!");

    } catch (error) {
      toast.error("Something went wrong!");
      console.log("error creating a product",error.message)
      
    }
    
    try {
      // Simulate submission
      await new Promise((res) => setTimeout(res, 1000));

      toast.success("Product created successfully!");
      // Reset form
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
// Handle image upload
  // Convert image to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);// Convert to base64
    }
  };

  return (
    <motion.div
      className='bg-gray-800 shadow-lg rounded-lg px-4 py-6 sm:px-8 mb-8 max-w-md sm:max-w-xl mx-auto'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Top Heading */}
      <h2 className='text-lg sm:text-2xl font-semibold mb-4 text-emerald-300 text-center'>
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Product Name */}
        <div>
          <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
            Product Name
          </label>
          <input
            type='text'
            maxLength={50}
            id='name'
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white
             focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base'
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor='description' className='block text-sm font-medium text-gray-300'>
            Description
          </label>
          <textarea
            id='description'
            rows='3'
            maxLength={250}
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base'
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor='price' className='block text-sm font-medium text-gray-300'>
            Price
          </label>
          <input
            type='number'
            id='price'
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            step='0.01'
            className='mt-1 block w-full bg-gray-700 border
             border-gray-600 rounded-md py-2 px-3 text-white
              focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base'
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor='category' className='block text-sm font-medium text-gray-300'>
            Category
          </label>
          <select
            id='category'
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className='mt-1 block w-full capitalize bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-emerald-500 focus:border-emerald-500 text-sm sm:text-base'
            required
          >
            <option value=''>Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )) }
          </select>
        </div>

        {/* Upload Image */}
        <div className='mt-1 flex items-center flex-wrap gap-3'>
          <input
            type='file'
            id='image'
            className='sr-only'
            accept='image/*'
            onChange={handleImageChange}
          />
          <label
            htmlFor='image'
            className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md text-sm text-gray-300 hover:bg-gray-600 focus:ring-emerald-500'
          >
            <Upload className='h-4 w-4 inline-block mr-2' />
            Upload Image
          </label>
          {newProduct.image && <span className='text-sm text-gray-400'>Image uploaded</span>}
        </div>

        {/* Image Preview */}
        {newProduct.image && (
          <img
            src={newProduct.image}
            alt='Preview'
            className='w-full h-44 object-cover rounded-md mt-3'
          />
        )}

        {/* Submit Button */}
        <button
          type='submit'
          disabled={loading}
          className='w-full flex justify-center items-center py-2 px-4 rounded-md text-sm sm:text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50'
        >
          {loading ? (
            <>
              <Loader className='mr-2 h-4 w-4 animate-spin' />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className='mr-2 h-4 w-4' />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, Loader, Save } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

const categories = [
  "earPod", "keyboard", "laptopStand", "leadStrip", "powerbank",
  "projector", "smartWatch", "usbHub", "wirelessCharger"
];


const EditingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", category: "", image: "", stock: 0,
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch product to edit
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get("https://dera-backend.onrender.com/api/product/" + id, {
  withCredentials: true,
});
        
        setProduct(data);
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          image: data.image,
          stock: data.stock,
        });
      } catch (error) {
        toast.error("Failed to load product.");
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
       await axios.put(
  `https://dera-backend.onrender.com/api/product/${id}`,
  updatedProductData,
  {
    withCredentials: true, // Important if you're using cookies for auth
  }
);

      toast.success("Product updated successfully!");
      navigate("/dashboard/products");
    } catch (error) {
      toast.error("Error updating product.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <motion.div
      className="bg-gray-800 max-w-xl mx-auto rounded-lg p-6 mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-6 text-center">
        Edit Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "description", "price", "stock"].map((field) => (
          <div key={field}>
            <label className="block text-sm text-gray-300 capitalize">{field}</label>
            {field === "description" ? (
              <textarea
                rows={3}
                maxLength={250}
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:ring-emerald-500"
                required
              />
            ) : (
              <input
                type={field === "price" || field === "stock" ? "number" : "text"}
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:ring-emerald-500"
                required
              />
            )}
          </div>
        ))}

        {/* Category */}
        <div>
          <label className="block text-sm text-gray-300">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 capitalize"
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="flex items-center gap-4">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="bg-gray-700 text-gray-300 px-4 py-2 rounded cursor-pointer hover:bg-gray-600 border border-gray-600"
          >
            <Upload className="inline-block mr-2 h-4 w-4" />
            Upload Image
          </label>
          {formData.image && <span className="text-gray-400 text-sm">Image selected</span>}
        </div>

        {/* Image Preview */}
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-full h-44 object-cover rounded mt-3"
          />
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="animate-spin w-4 h-4" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default EditingPage;

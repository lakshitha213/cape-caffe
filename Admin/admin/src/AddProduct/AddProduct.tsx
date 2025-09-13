import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Plus, Image, DollarSign, FileText } from "lucide-react";
import axios from "axios";

interface ProductForm {
  name: string;
  price: string;
  description: string;
  category: string;
  image: File | null;
}

const AddProduct: React.FC = () => {
  const [form, setForm] = useState<ProductForm>({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string>(""); 
  const [error, setError] = useState<string>(""); 

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setForm({ ...form, image: file });

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);
    if (form.image) formData.append("image", form.image);

    try {
  const res = await axios.post(
    "http://localhost:5000/api/products/add",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  console.log("Response from server:", res.data);

  if (res.data.success) {
    // Show backend message OR fallback
    setMessage(res.data.message || "✅ Product added successfully!");
    setError("");

    // Reset form
    setForm({ name: "", price: "", description: "", category: "", image: null });
    setPreview(null);
  } else {
    // Backend responded but with failure
    setError(res.data.message || "❌ Failed to add product");
    setMessage("");
  }
} catch (err: unknown) {
  if (axios.isAxiosError(err) && err.response?.data?.message) {
    setError(err.response.data.message);
  } else {
    setError("❌ Error adding product");
  }
  setMessage(""); // clear success msg
  console.error("Add product error:", err);
}

  };

  return (
    <div style={{ maxWidth: "896px", margin: "0 auto" }}>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Add New Product</h2>
        <p className="text-gray-600">
          Fill in the details below to add a new product to your catalog.
        </p>

        {/* Success message */}
        {message && (
          <p className="mt-4 p-3 bg-green-100 text-green-800 rounded">
            {message}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p className="mt-4 p-3 bg-red-100 text-red-800 rounded">
            {error}
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-6"
        encType="multipart/form-data"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "24px",
          }}
        >
          {/* Product Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus-ring transition-all"
              required
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={form.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus-ring transition-all"
              required
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus-ring transition-all"
              required
            >
              <option value="">Select a category</option>
              <option value="espresso">Espresso</option>
              <option value="doppio">Doppio</option>
              <option value="americano">Americano</option>
              <option value="latte">Latte</option>
              <option value="cappuccino">Cappuccino</option>
              <option value="macchiato">Macchiato</option>
              <option value="flat_white">Flat White</option>
              <option value="mocha">Mocha</option>
              <option value="cortado">Cortado</option>
              <option value="iced_coffee">Iced Coffee</option>
              <option value="cold_brew">Cold Brew</option>
              <option value="nitro_cold_brew">Nitro Cold Brew</option>
              <option value="iced_latte">Iced Latte</option>
              <option value="iced_americano">Iced Americano</option>
              <option value="frappe">Frappe / Frappuccino</option>
              <option value="affogato">Affogato</option>
              <option value="irish_coffee">Irish Coffee</option>
              <option value="turkish_coffee">Turkish Coffee</option>
              <option value="vietnamese_coffee">Vietnamese Coffee</option>
              <option value="cafe_au_lait">Café au Lait</option>
              <option value="cafe_cubano">Café Cubano</option>
              <option value="cafe_de_olla">Café de Olla</option>
              <option value="kopi">Kopi</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Image className="w-4 h-4" />
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus-ring transition-all"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg border"
              />
            )}
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            placeholder="Enter product description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus-ring transition-all resize-none"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(to right, #2563eb, #1d4ed8)",
          }}
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

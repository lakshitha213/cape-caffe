"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

type ProductType = {
    _id: string;
    name: string;
    category: string;
    price: number;
    description: string;
};

const Product = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    // Removed unused groupedProducts state
    const [search, setSearch] = useState("");

    // Fetch products from backend
    const fetchProducts = () => {
        axios
            .get("http://localhost:5000/api/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => console.error("❌ Fetch error:", err));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Group products by category
    // Removed groupProducts and setGroupedProducts since they're unused

    // Filter products based on search input
    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase())
    );

    const groupedFilteredProducts = Object.values(filteredProducts).length
        ? filteredProducts.reduce((acc: Record<string, ProductType[]>, product) => {
            if (!acc[product.category]) acc[product.category] = [];
            acc[product.category].push(product);
            return acc;
        }, {})
        : {};

    // Handle product deletion
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            setProducts((prev) => prev.filter((product) => product._id !== id));
        } catch (err) {
            console.error("❌ Delete error:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-amber-900 mb-2">
                    🛒 Our Products
                </h1>
                <p className="text-sm md:text-base text-amber-700 max-w-xl mx-auto">
                    Manage your products easily. Search or delete items.
                </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-10 relative">
                <input
                    type="text"
                    placeholder="Search by name or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-300 rounded-full px-4 py-3 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-sm md:text-base placeholder-gray-400 transition"
                />
               
            </div>

            {/* Products */}
            {Object.keys(groupedFilteredProducts).length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No products found.</p>
            ) : (
                <div className="max-w-5xl mx-auto space-y-16">
                    {Object.entries(groupedFilteredProducts).map(([category, items]) => (
                        <div key={category}>
                            <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-6 border-b-2 border-amber-400 inline-block pb-1">
                                {category}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {items.map((product) => (
                                    <div
                                        key={product._id}
                                        className="flex items-center bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 gap-4"
                                    >
                                        {/* Image */}
                                        <div className="w-[100px] h-[100px] flex-shrink-0 overflow-hidden rounded-lg">
                                            <img
                                                src={`http://localhost:5000/api/products/${product._id}/image`}
                                                alt={product.name}
                                                className="w-full h-full object-cover transform hover:scale-110 transition duration-300"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex flex-col flex-grow">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate">
                                                    {product.name}
                                                </h3>
                                                <span className="text-green-600 font-bold text-sm md:text-base">
                                                    ${product.price.toFixed(2)}
                                                </span>
                                            </div>
                                            <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">
                                                {product.description}
                                            </p>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="mt-3 flex items-center gap-2 bg-red-700 text-black px-3 py-1.5 rounded-lg text-xs md:text-sm hover:bg-red-900 shadow-sm transition w-max"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Product;

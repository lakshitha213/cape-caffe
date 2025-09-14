"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import "./Product.css"; // 👈 Import CSS file

type ProductType = {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
};

const Product = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [search, setSearch] = useState("");

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Fetch error:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  const groupedFilteredProducts = filteredProducts.reduce(
    (acc: Record<string, ProductType[]>, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    },
    {}
  );

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  };

  return (
    <div className="product-page">
      {/* Header */}
      <div className="product-header">
        <h1>🛒 Our Products</h1>
        <p>Manage your products easily. Search or delete items.</p>
      </div>

      {/* Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Products */}
      {Object.keys(groupedFilteredProducts).length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No products found.</p>
      ) : (
        <div className="category-section space-y-16">
          {Object.entries(groupedFilteredProducts).map(([category, items]) => (
            <div key={category}>
              <h2 className="category-title">{category}</h2>
              <div className="products-grid">
                {items.map((product) => (
                  <div key={product._id} className="product-card">
                    <div className="product-image">
                      <img
                        src={`http://localhost:5000/api/products/${product._id}/image`}
                        alt={product.name}
                      />
                    </div>
                    <div className="product-info">
                      <div className="product-header-row">
                        <h3 className="product-name">{product.name}</h3>
                        <span className="product-price">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="product-description">
                        {product.description}
                      </p>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="delete-btn"
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

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Products() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get('http://localhost:5000/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
      <h1 className="text-center text-white text-4xl font-bold mb-8">Our Products</h1>
      <div className="grid-layout">
        {products.map((product) => (
          <div key={product.id} className="card">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="card-title">{product.name}</h2>
              <p className="card-price">${product.price.toFixed(2)}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="button"
                  onClick={() => router.push(`/products/${product.id}`)}
                >
                  View Details
                </button>
                <button
                  className="button bg-red-500 hover:bg-red-700"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

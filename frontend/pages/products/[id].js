import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        const { data } = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700">
            This is a placeholder description for {product.name}. You can add more details here.
          </p>
          <button
            className="mt-6 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
            onClick={() => router.push('/products')}
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}

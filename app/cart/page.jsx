// pages/cart.js
'use client';
import React from 'react';
import { useCart } from '@/app/lib/hooks/useCart';
import Image from 'next/image';
import { useAuth } from '@/app/contexts/AuthContext';

const CartPage = () => {
  const { cart, loading, error, removeMealFromCart } = useCart();
  const { user } = useAuth();
console.log(cart,"cart add");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((meal) => (
            <div key={meal.idMeal} className="border rounded-lg p-4 shadow-sm">
              <div className="relative h-48">
                <Image 
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{meal.strMeal}</h3>
                <p className="text-gray-600 mt-2">{meal.strCategory}</p>
                <button
                  onClick={() => removeMealFromCart(meal.idMeal)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
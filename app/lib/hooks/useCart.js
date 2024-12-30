// src/hooks/useCart.js
import { useState, useCallback } from 'react';
import { addToCart, getCart, removeFromCart } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCart(token);
      setCart(data.cart);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const addMealToCart = async (mealId) => {
    try {
      setError(null);
      await addToCart(mealId, token);
      await fetchCart(); // Refresh cart after adding
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeMealFromCart = async (mealId) => {
    try {
      setError(null);
      await removeFromCart(mealId, token);
      await fetchCart(); // Refresh cart after removing
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    cart,
    loading,
    error,
    fetchCart,
    addMealToCart,
    removeMealFromCart,
  };
};
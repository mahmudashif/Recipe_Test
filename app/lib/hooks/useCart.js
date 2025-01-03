import { useState, useCallback, useEffect } from "react";
import { addToCart, getCart, removeFromCart } from "../api";
import { useAuth } from "@/app/contexts/AuthContext";
import HttpKit from "@/common/helpers/HttpKit";

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cartData = await getCart(token);
      console.log(cartData, "cartdata");

      // Fetch recipe details for each cart item
      const cartWithDetails = await Promise.all(
        cartData.cart.map(async (item) => {
          const recipeData = await HttpKit.getRecipeDetails(item.mealId);
          return {
            ...item,
            ...recipeData,
          };
        })
      );
      console.log(cartWithDetails, "cartdetails");

      setCart(cartWithDetails);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      const localCart = localStorage.getItem("cart");
      if (localCart) setCart(JSON.parse(localCart));
    }
  }, [user, fetchCart]);

  const addMealToCart = async (meal) => {
    if (user) {
      try {
        await addToCart(meal.idMeal, token);
        await fetchCart();
      } catch (err) {
        setError(err.message);
        throw err;
      }
    } else {
      const cartItem = {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        strCategory: meal.strCategory,
      };
      const updatedCart = [...cart, cartItem];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const removeMealFromCart = async (mealId) => {
    if (user) {
      try {
        await removeFromCart(mealId, token);
        await fetchCart();
      } catch (err) {
        setError(err.message);
        throw err;
      }
    } else {
      const updatedCart = cart.filter((item) => item.idMeal !== mealId);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
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

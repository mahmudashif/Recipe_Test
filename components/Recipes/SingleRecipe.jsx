"use client";
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useAuth } from "@/app/contexts/AuthContext";
import { useCart } from "@/app/lib/hooks/useCart";

const SingleRecipe = ({ id, setIsOpen }) => {
  const { user } = useAuth();
  const { addMealToCart } = useCart();

  const { data, isLoading } = useQuery({
    queryKey: ["recipe-details", id],
    queryFn: () => HttpKit.getRecipeDetails(id),
  });

  const handleAddToCart = async () => {
    try {
      const mealData = {
        idMeal: data.idMeal,
        strMeal: data.strMeal,
        strMealThumb: data.strMealThumb,
        strCategory: data.strCategory
      };
      await addMealToCart(mealData);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (isLoading) return "Loading...";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
      <div>
        <Image
          src={data?.strMealThumb}
          width={500}
          height={500}
          alt={data?.strMeal || "Recipe image"}
          className="rounded-lg"
        />
      </div>
      <h2 className="text-2xl font-semibold">{data?.strMeal}</h2>
    </div>
  );
};

export default SingleRecipe;

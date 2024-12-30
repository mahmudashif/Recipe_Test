'use client';
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const SingleRecipe = ({ id, setIsOpen }) => {
  console.log(id,"single recipe id");
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe-details"],
    queryFn: () => HttpKit.getRecipeDetails(id),
  });
console.log(data,"single recipe");

  // if (!isLoading) return "Loading...";
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
      <div>
        <Image src={data?.strMealThumb} width={500} height={500} alt="Image" />
      </div>
      <h2 className="text2xl font-semibold">{data?.strMeal}</h2>
    </div>
  );
};

export default SingleRecipe;

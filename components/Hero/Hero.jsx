import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div>
      {/* BANNER */}
      <div className="relative bg-yellow-50 z-10">
        <div className="container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
          <div className="flex items-center flex-wrap px-2 md:px-0">
            <div className="relative lg:w-6/12 lg:py-24 xl:py-32">
              <h1 className="font-bold text-4xl text-yellow-900  md:text-5xl lg:w-10/12">
                Your favorite dishes, right at your door
              </h1>
              <p className="mt-8 text-gray-700  lg:w-10/12">
                Order food and groceries online from the largest online food
                delivery platform.
              </p>
            </div>
            <div className="hidden md:block md:w-7/12 lg:w-6/12 relative">
              <Image
                src="/images/home/food.webp"
                className="relative w-full"
                alt="food illustration"
                loading="lazy"
                width={850}
                height={700}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

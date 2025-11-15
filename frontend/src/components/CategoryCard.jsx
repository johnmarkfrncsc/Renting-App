import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ icon, title, handleClick }) => {
  return (
    <>
      <Link to={"/list"} className="">
        <button className=" bg-white h-auto pr-4 w-full xl:w-xs flex gap-2 rounded-4xl shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
          <figure className="bg-pink-700 p-4 rounded-4xl">{icon}</figure>
          <h1 className="text-pink-700 font-semibold pt-4 ml-8 md:ml-0 xl:pt-3 xl:pl-10 xl:text-2xl">
            {title}
          </h1>
        </button>
      </Link>
    </>
  );
};

export default CategoryCard;

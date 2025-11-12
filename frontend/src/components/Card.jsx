import React from "react";

const Card = ({ title, description, category, price, address, img }) => {
  return (
    <>
      <div className="card w-96 shadow-none border-0 bg-transparent text-black">
        <figure>
          <img src={img} alt="image" className="w-full h-64 rounded-3xl" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <p>{address}</p>
          <p>{category}</p>
          <p>{price}</p>
        </div>
      </div>
    </>
  );
};

export default Card;

import React from "react";

const Card = ({ title, description, category, price, address, img }) => {
  return (
    <>
      <div className="card w-96 border-0 text-black shadow-xl hover:scale-110 transition-transform duration-300 ease-in-out">
        <figure>
          <img
            src={img}
            alt="image"
            className="w-full h-64 md:h-80 lg:h-96 object-cover"
          />
        </figure>
        <div className="card-body ">
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

import React from "react";
import ShowcaseImage from "../../assets/images/ShowcaseImage.jpg";

const ShowcaseSection = () => {
  return (
    <>
      <div className="h-screen w-full bg-neutral-300 text-black p-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-center md:py-4">
          Discover Exclusive Listings
        </h1>
        <section className="flex flex-col md:flex-row md:shadow-xl lg:m-10 md:hover:scale-105 transition-transform duration-300 ease-in-out">
          <figure className="md:w-1/2">
            <img
              src={ShowcaseImage}
              alt="Luxury Rental Showcase"
              className="w-full h-64 md:h-full object-cover"
            />
          </figure>
          <div className="**:py-1 md:w-1/2 p-2 md:p-6 lg:p-10 flex flex-col justify-center lg:tracking-wide ">
            <h2 className="text-2xl lg:text-4xl font-bold">
              Metropolitan Condos
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Explore our hand-picked selection of high-end, fully-furnished
              condos in Manila's most exclusive neighborhoods. Featuring
              concierge service, infinity pools, and panoramic city views.
            </p>
            <p className="text-gray-700 pl-2">
              Starting at <strong>15,000</strong>
            </p>
            <button className="btn shadow-none border-0 rounded-3xl bg-pink-700 text-white ">
              View Exclusive Listings
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default ShowcaseSection;

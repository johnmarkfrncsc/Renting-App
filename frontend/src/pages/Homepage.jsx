import React from "react";
import Navbar from "../components/Navbar.jsx";
import HeroImage from "../assets/images/HeroImage.jpg";
import { MousePointerClick } from "lucide-react";
import FeaturedSection from "../components/featured/FeaturedSection.jsx";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <header className="h-screen bg-neutral-100">
        <div className="flex flex-col justify-center text-center p-4">
          <div
            className="bg-cover bg-center bg-black/50 bg-blend-overlay h-100 rounded-3xl justify-center text-left p-4 "
            style={{ backgroundImage: `url(${HeroImage})` }}
          >
            <div className="m-4">
              <h1 className="text-3xl text-white font-bold">
                Find Your <span className="text-pink-700">Perfect Rental</span>{" "}
                Home
              </h1>
              <p className="text-lg text-neutral-300 font-semibold py-2">
                The simplest way to browse houses, condos, apartments, and rooms
                across
                <span className="text-pink-700">
                  <br />
                  samin lang
                </span>
              </p>
              <button className="btn px-4 rounded-3xl bg-pink-700 ">
                Browse
                <MousePointerClick className="size-5" />
              </button>
            </div>
          </div>
        </div>
        <FeaturedSection />
      </header>
    </>
  );
};

export default Homepage;

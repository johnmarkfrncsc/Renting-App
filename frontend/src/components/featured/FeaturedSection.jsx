import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Card";

const FeaturedSection = () => {
  const [data, setData] = useState([]);
  const fetchRents = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/rents`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRents();
  }, []);

  return (
    <section className="px-4 py-8 md:px-8 lg:px-16  bg-neutral-100">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-black text-2xl md:text-3xl font-semibold">
          Top-rated rentals in Manila
        </h2>
        <p className="text-neutral-500 text-sm md:text-base">
          Guests agree: these stays are highly rated for location, cleanliness,
          and more.
        </p>
      </div>

      <div className="overflow-hidden">
        <div className="flex gap-4">
          {data.map((data, _id) => (
            <Card
              key={_id}
              title={data.rentTitle}
              description={data.rentDescription}
              category={data.rentCategory}
              address={data.rentAddress}
              price={data.rentPrice}
              img={data.rentImageURL}
            />
          ))}
        </div>
      </div>
      {/* Embla Carousel
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {rentals.map((rental, _id) => (
            <div
              key={_id}
              className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_25%]  overflow-hidden shadow-lg"
            >
              <img
                src={rental.image}
                alt={`Featured ${_id + 1}`}
                className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-300 rounded-2xl hover:scale-105 "
              />
              <h2 className="text-black mt-4">{rental.rentTitle}</h2>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
};

export default FeaturedSection;

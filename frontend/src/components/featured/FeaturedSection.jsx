import axios from "axios";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const FeaturedSection = () => {
  const [data, setData] = useState([]);
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "center",
  });

  const fetchRents = async () => {
    try {
      const response = await axios.get("/api/rents");
      const rents = response.data?.data;
      setData(Array.isArray(rents) ? rents : []);
    } catch (error) {
      console.error("Error fetching rentals:", error);
    }
  };

  useEffect(() => {
    fetchRents();
  }, []);

  return (
    <section className="px-4 py-8 md:px-8 lg:px-16 bg-neutral-300">
      <div className="text-center mb-6">
        <h2 className="text-black text-2xl md:text-3xl font-semibold">
          Top-rated rentals in Manila
        </h2>
        <p className="text-neutral-500 text-sm md:text-base">
          Guests agree: these stays are highly rated for location, cleanliness,
          and more.
        </p>
      </div>

      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-6 sm:gap-8 md:gap-6 md:p-4 lg:p-8">
          {data.map((item, index) => (
            <div
              key={index}
              className="
                embla__slide
                flex-[0_0_80%]
                sm:flex-[0_0_45%]
                md:flex-[0_0_30%]
                lg:flex-[0_0_25%]
                flex 
                justify-center
                hover:scale-105 transition-transform duration-300 ease-in-out
              "
            >
              <div
                className="
                  w-full 
                  bg-white 
                  rounded-2xl 
                  shadow-md 
                  hover:shadow-lg 
                  transition-shadow 
                  duration-300 
                  overflow-hidden
                  flex 
                  flex-col
                "
              >
                <div className="w-full">
                  <img
                    src={item.rentImageURL}
                    alt={item.rentTitle}
                    className="
                      w-full 
                      h-56 
                      sm:h-64 
                      md:h-72 
                      lg:h-80 
                      object-cover 
                      rounded-t-2xl 
                    "
                  />
                </div>

                <div className="p-4 flex flex-col grow">
                  <h3 className="text-lg font-semibold text-black mb-2 truncate">
                    {item.rentTitle}
                  </h3>
                  <p className="text-sm text-neutral-600 line-clamp-2 mb-2">
                    {item.rentDescription}
                  </p>
                  <div className="text-sm text-neutral-500 mb-2">
                    {item.rentAddress}
                  </div>
                  <p className="text-pink-700 font-semibold mt-auto">
                    ₱{item.rentPrice}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;

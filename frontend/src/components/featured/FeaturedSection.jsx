import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import FeaturedCondo from "../../assets/images/featuredImages/FeaturedCondo.jpg";
import FeaturedVacation from "../../assets/images/featuredImages/FeaturedVacation.jpg";
import featuredDorms from "../../assets/images/featuredImages/featuredDorms.jpg";
import featuredHouse from "../../assets/images/featuredImages/featuredHouse.jpg";
import featuredApartment from "../../assets/images/featuredImages/featuredApartment.jpg";

const FeaturedSection = () => {
  const [emblaRef] = useEmblaCarousel({ loop: false, skipSnaps: true });

  const slides = [
    FeaturedCondo,
    FeaturedVacation,
    featuredDorms,
    featuredHouse,
    featuredApartment,
  ];

  return (
    <section className="px-4 py-8 md:px-8 lg:px-16 min-h-screen bg-neutral-100">
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

      {/* Embla Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_25%] rounded-3xl overflow-hidden shadow-lg"
            >
              <img
                src={slide}
                alt={`Featured ${index + 1}`}
                className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;

{
  /* <img
            src={FeaturedCondo}
            alt="Featured condo"
            className="
              w-full 
              h-56 sm:h-72 md:h-80 lg:h-112 
              object-cover 
              transition-transform 
              duration-300 
              hover:scale-105
            "
          />
          <img
            src={FeaturedVacation}
            alt="Featured condo"
            className="
              w-full 
              h-56 sm:h-72 md:h-80 lg:h-112 
              object-cover 
              transition-transform 
              duration-300 
              hover:scale-105
            "
          /> */
}

{
  /* <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          ...
        </Swiper> */
}

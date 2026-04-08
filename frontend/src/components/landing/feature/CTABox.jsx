import { useState } from "react";
import { Link } from "react-router-dom";

const CTABox = () => {
  const [showLearnMore, setShowLearnMore] = useState(false);

  return (
    <div id="cta" className="px-5 md:px-6 py-16 md:py-20">
      <div className="max-w-lg mx-auto text-center bg-base-200 border border-base-300/60 shadow-sm hover:shadow-md rounded-2xl px-8 py-14 md:px-14">
        <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-3">
          Own a property? List it on Rentara
        </h2>
        <div className="w-full h-0.5 rounded-full bg-primary mx-auto mb-6" />

        <p className="text-sm text-base-content/50 max-w-xs mx-auto mb-8">
          Reach thousands of pre-screened renters every month. Listing is free —
          we only earn when you do.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-content hover:opacity-85 transition-all"
          >
            List your property
          </Link>
          <button
            type="button"
            onClick={() => setShowLearnMore(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium border border-base-300 bg-base-200/60 text-base-content hover:bg-base-200 transition-all"
          >
            Learn more
          </button>
        </div>

        {showLearnMore && (
          <div
            className="fixed inset-0 bg-transparent backdrop-blur-xs flex items-center justify-center z-50"
            onClick={() => setShowLearnMore(false)}
          >
            <div
              className="bg-base-300 p-6 rounded-xl max-w-md w-full shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLearnMore(false)}
                className="absolute top-3 right-3 text-md hover:bg-base-200/50 px-2 py-0.5 rounded-full cursor-pointer"
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold mb-2">
                Find a place you’ll love living in.
              </h2>

              <p className="text-md text-base-content/70 mb-5 tracking-wide">
                Discover homes, apartments, and rentals that fit your
                lifestyle—all in one simple place.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CTABox;

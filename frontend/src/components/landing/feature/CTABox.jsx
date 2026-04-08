import { Link } from "react-router-dom";

const CTABox = () => {
  return (
    <div className="px-5 md:px-6 py-16 md:py-20">
      <div className="max-w-lg mx-auto text-center bg-base-200/60 border border-base-300/60 rounded-2xl px-8 py-14 md:px-14">
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
          <a
            href="#"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium border border-base-300 bg-base-200/60 text-base-content hover:bg-base-200 transition-all"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTABox;

import Navbar from "../components/landing/layout/Navbar";
import Footer from "../components/landing/layout/Footer";
import Hero from "../components/landing/section/Hero";
import FeaturedListing from "../components/landing/section/FeaturedListing";
import FeatureStrip from "../components/landing/feature/FeatureStrip";
import CTABox from "../components/landing/feature/CTABox";

const LandingPage = () => {
  return (
    <div className="rn-root">
      <Navbar />
      <Hero />
      <FeaturedListing />
      <FeatureStrip />
      <CTABox />
      <Footer />
    </div>
  );
};

export default LandingPage;

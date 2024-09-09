import Banner from "./sections/banner/banner";
import AboutSection from "./sections/about/about";
import CustomersSection from "./sections/v2/customers/customers";
import LearnFromUsSection from "./sections/v2/learn/learn";
import ServicesSection from "./sections/v2/services/services";
import TestimonialsSection from "./sections/v2/testimonials/testimonials";
import YoutubeSection from "./sections/v2/youtube/youtube";
import GallerySection from "./sections/v2/galery/galery";
import { useEffect, useState } from "react";

const HomeScreen = (props) => {
  const { reviews, galleryImages, blogs } = props;

  const [showGallery, setShowGalley] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowGalley(!!galleryImages?.[0]);
    }, 1000);
  }, []);

  return (
    <>
      <Banner />
      <AboutSection />
      <ServicesSection />
      <CustomersSection />
      <TestimonialsSection reviews={reviews} />
      <LearnFromUsSection blogs={blogs} />
      <YoutubeSection />
      {showGallery && <GallerySection galleryImages={galleryImages || []} />}
    </>
  );
};

export default HomeScreen;

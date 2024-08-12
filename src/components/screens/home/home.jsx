import Banner from "./sections/banner/banner";
import { useState } from "react";
import { useRouter } from "next/router";
import AboutSection from "./sections/about/about";
import CustomersSection from "./sections/v2/customers/customers";
import LearnFromUsSection from "./sections/v2/learn/learn";
import ServicesSection from "./sections/v2/services/services";
import TestimonialsSection from "./sections/v2/testimonials/testimonials";
import { ImageGallery } from "react-image-grid-gallery";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import GallerySection from "./sections/v2/galery/galery";

const HomeScreen = (props) => {
  const { reviews, galleryImages } = props;
  return (
    <>
      <Banner />
      <AboutSection />
      <ServicesSection />
      <CustomersSection />
      <TestimonialsSection reviews={reviews} />
      <LearnFromUsSection />
      <GallerySection galleryImages={galleryImages} />
      {/* <Categories /> */}
    </>
  );
};

export default HomeScreen;

{
  /* <>
<EnquirePopup
  show={!!showPopup}
  setShow={setShowPopup}
  initialMessage={showPopup}
/>
<CustomContainer>
  <Banner bannerImages={bannerImages} setShowPopup={setShowPopup} />
</CustomContainer>
<Profiles profileData={profileData}/>
<Certificates />
<Categories />
<Pricing packages={packages} />
<CustomContainer>
  <iframe
    src="https://www.instagram.com/skbeautyverse/embed"
    // width="2000"
    // className={}
    style={{
      width: "100%",
      // padding: "50px 0",
      margin: "50px 0",
      height: "600px",
      overflow: "auto",
      borderRadius: "12px",
      // border:'10px solid white'
    }}
    // height="700"
    frameborder="0"
    scrolling="no"
    allowtransparency="true"
  ></iframe>
</CustomContainer>

<CustomContainer>
  <CustomSection head="Customer Reviews">
    <Row>
      {reviews &&
        reviews
          .sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
          .map((review) => {
            return (
              <Review
                key={review._id}
                review={review}
                deleteReview={() => {}}
                reviews={reviews}
              />
            );
          })}
    </Row>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CustomButton
        clickHandler={() => {
          router.replace("/reviews");
        }}
      >
        View More Reviews
      </CustomButton>
    </div>
  </CustomSection>
</CustomContainer>

<ContactForm />
<Collection setShowPopup={setShowPopup} />
</> */
}

// import About from "./sections/collection/collection";
import Collection from "./sections/collection/collection";
import Banner from "./sections/banner/banner";
import Categories from "./sections/categories/categories";
import Pricing from "./sections/pricing/pricing";
import EnquirePopup from "@/components/enquire_popup/enquire_popup";
import { useState } from "react";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import Certificates from "../about/certificates/certificates";
import CustomSection from "@/components/ui/custom_section/custom_section";
import Review from "../reviews/review/review";
import { Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { useRouter } from "next/router";
import ContactForm from "../contact/contact_form";

const HomeScreen = (props) => {
  const { packages, bannerImages, reviews } = props;

  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();

  return (
    <>
      <EnquirePopup
        show={!!showPopup}
        setShow={setShowPopup}
        initialMessage={showPopup}
      />
      <CustomContainer>
        <Banner bannerImages={bannerImages} setShowPopup={setShowPopup} />
      </CustomContainer>
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
            {reviews
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

      <Collection setShowPopup={setShowPopup} />

      <ContactForm />
    </>
  );
};

export default HomeScreen;

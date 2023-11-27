// import About from "./sections/collection/collection";
import Collection from "./sections/collection/collection";
import Banner from "./sections/banner/banner";
import Categories from "./sections/categories/categories";
import Pricing from "./sections/pricing/pricing";
import EnquirePopup from "@/components/enquire_popup/enquire_popup";
import { useState } from "react";
import CustomContainer from "@/components/ui/custom_container/custom_container";

const HomeScreen = (props) => {
  const { packages, bannerImages } = props;

  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <EnquirePopup show={showPopup} setShow={setShowPopup} />
      <Banner bannerImages={bannerImages} setShowPopup={setShowPopup} />
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
            margin:'50px 0',
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
      <Collection setShowPopup={setShowPopup} />
    </>
  );
};

export default HomeScreen;

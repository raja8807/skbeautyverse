// import About from "./sections/collection/collection";
import Collection from "./sections/collection/collection";
import Banner from "./sections/banner/banner";
import Categories from "./sections/categories/categories";
import Pricing from "./sections/pricing/pricing";
import EnquirePopup from "@/components/enquire_popup/enquire_popup";
import { useState } from "react";

const HomeScreen = (props) => {
  const { packages, bannerImages } = props;

  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <EnquirePopup show={showPopup} setShow={setShowPopup} />
      <Banner bannerImages={bannerImages} setShowPopup={setShowPopup}/>
      <Categories />
      <Pricing packages={packages} />
      <Collection />
    </>
  );
};

export default HomeScreen;

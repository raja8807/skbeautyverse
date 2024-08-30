import ServicesPopup from "./services_popup/services_popup";
import Footer from "./footer/footer";
import SocialMediaBar from "./social_media_bar/social_media_bar";
import { useRef, useState } from "react";

const { default: Header } = require("./header/header");

const Layout = (props) => {
  const { children, customer, services } = props;
  const servicesRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <div
        onMouseLeave={() => {
          setShowPopup(false);
        }}
      >
        {showPopup && (
          <ServicesPopup
            services={services}
            servicesRef={servicesRef}
            setShowPopup={setShowPopup}
          />
        )}
        <Header
          customer={customer}
          services={services}
          servicesRef={servicesRef}
          setShowPopup={setShowPopup}
        />
      </div>
      <SocialMediaBar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

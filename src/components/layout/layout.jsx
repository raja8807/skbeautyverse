import Footer from "./footer/footer";
import SocialMediaBar from "./social_media_bar/social_media_bar";

const { default: Header } = require("./header/header");

const Layout = (props) => {
  const { children, customer } = props;
  return (
    <>
      <Header customer={customer} />
      <SocialMediaBar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

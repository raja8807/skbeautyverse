import Footer from "./footer/footer";
import WhatsappButton from "./whatsapp_button/whatsapp_button";

const { default: Header } = require("./header/header");

const Layout = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
      <Footer/>
      <WhatsappButton/>
    </>
  );
};

export default Layout;

import Footer from "./footer/footer";

const { default: Header } = require("./header/header");

const Layout = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
      <Footer/>
    </>
  );
};

export default Layout;

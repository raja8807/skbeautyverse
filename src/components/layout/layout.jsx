const { default: Header } = require("./header/header");

const Layout = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;

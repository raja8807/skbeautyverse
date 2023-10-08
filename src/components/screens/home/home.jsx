// import About from "./sections/collection/collection";
import Collection from "./sections/collection/collection";
import Banner from "./sections/banner/banner";
import Categories from "./sections/categories/categories";
import Pricing from "./sections/pricing/pricing";

const HomeScreen = () => {
  return (
    <>
      <Banner />
      <Categories />
      <Pricing/>
      <Collection />
    </>
  );
};

export default HomeScreen;

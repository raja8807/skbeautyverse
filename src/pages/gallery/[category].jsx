const {
  default: GalleryScreen,
} = require("@/components/screens/gallery/gallery");

const Gallery = ({ images }) => {
  // console.log(images);
  return <GalleryScreen images={images} />;
};

export default Gallery;

export async function getServerSideProps() {
  //   console.log("aeoaen-------------------------->>>>");
  const limit = Math.floor(Math.random() * 40);
  try {
    const res = await fetch(
      " https://picsum.photos/v2/list?page=2&limit=" + limit
    );
    const images = await res.json();
    return { props: { images } };
  } catch (err) {
    console.log(err);
    return { props: { images: [] } };
  }

  // Pass data to the page via props
}

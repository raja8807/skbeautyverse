const {
  default: GalleryScreen,
} = require("@/components/screens/gallery/gallery");

const Gallery = ({ images }) => {
  return <GalleryScreen images={images} />;
};

export default Gallery;

export async function getServerSideProps(context) {
  try {
    const q = context.query.category
    const res = await fetch(
      `http://${context.req.headers.host}/api/galleryImage?q=${q}`
    );
    const homeData = await res.json();
    return { props: { images:homeData } };
  } catch (err) {
    console.log('errr--->',err);
    return { props: { images: 'errr-->'+err.message } };
  }
}

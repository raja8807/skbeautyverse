import GalleryForm from "@/components/screens/admin/gallery_admin/gallery_form";

const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");

const GalleryAdmin = ({ galleyImages }) => {
  
  return (
    <CustomContainer>
      <GalleryForm galleryImages={galleyImages} />
    </CustomContainer>
  );
};

export default GalleryAdmin;

export async function getServerSideProps(context) {
  //   console.log("aeoaen-------------------------->>>>");
 
  try {
    const q = context.query.category
    const res = await fetch(
      `http://${context.req.headers.host}/api/galleryImage?q=${q}`
    );
    const galleyImages = await res.json();
    return { props: { galleyImages } };
  } catch (err) {
    console.log("errr--->", err);
    return { props: { images: "errr-->" + err.message } };
  }
}

import GalleryForm from "@/components/screens/admin/gallery_admin/gallery_form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getSession } from "next-auth/react";

const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");

const GalleryAdmin = ({ galleyImages }) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.data) {
      router.push("/account");
    }
  }, [router, session]);

  return (
    <CustomContainer>
      {galleyImages && <GalleryForm galleryImages={galleyImages} />}
    </CustomContainer>
  );
};

export default GalleryAdmin;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  try {
    // if (session) {
      const q = context.query.category;
      const res = await fetch(
        `http://${context.req.headers.host}/api/galleryImage?q=${q}`
      );
      const galleyImages = await res.json();
      return { props: { galleyImages } };
    // }
    // return { props: { galleyImages: null } };
  } catch (err) {
    return { props: { images: "errr-->" + err.message } };
  }
}

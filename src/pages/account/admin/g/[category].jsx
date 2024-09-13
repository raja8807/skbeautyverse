import GalleryForm from "@/components/screens/admin/gallery_admin/gallery_form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import PageHead from "@/components/ui/page_head/page_head";
import { v4 } from "uuid";

const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");

const GalleryAdmin = ({ galleyImages, keyId }) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status !== "loading" && !session?.data) {
      router.push("/account");
    }
  }, [router, session]);

  return (
    <>
      <PageHead head="Admin" />
      <CustomContainer>
        {galleyImages && (
          <GalleryForm galleryImages={galleyImages} key={keyId} />
        )}
      </CustomContainer>
    </>
  );
};

export default GalleryAdmin;

export async function getServerSideProps(context) {
  try {
    // if (session) {
    const keyId = v4();
    const q = context.query.category;
    const res = await fetch(
      `http://${context.req.headers.host}/api/galleryImage?q=${q}`
    );
    const galleyImages = await res.json();
    return { props: { galleyImages, keyId } };
    // }
    // return { props: { galleyImages: null } };
  } catch (err) {
    return { props: { images: "errr-->" + err.message } };
  }
}

import AdminPanel from "@/components/screens/admin/admin_panel/admin_panel";
import LoginBox from "@/components/screens/admin/login/login";
import { useSession, getSession } from "next-auth/react";

const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Admin = ({ homeData }) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session.data) {
      router.replace("/account/login");
    }
  }, [router, session]);

  return (
    <CustomContainer>
      {session?.data ? (
        <>
          <Link href="admin/g/bridal">Edit Galley</Link>
          {homeData && <AdminPanel homeData={homeData} />}
        </>
      ) : null}
    </CustomContainer>
  );
};

export default Admin;

export async function getServerSideProps(context) {
  try {
    const session = await getSession(context);
    if (session) {
      const res = await fetch(
        `http://${context.req.headers.host}/api/homeData`
      );
      const homeData = await res.json();
      return { props: { homeData } };
    }
    return { props: { homeData: null } };
  } catch (err) {
    return { props: { images: "errr-->" + err.message } };
  }
}

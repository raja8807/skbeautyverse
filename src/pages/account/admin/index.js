import AdminPanel from "@/components/screens/admin/admin_panel/admin_panel";
import LoginBox from "@/components/screens/admin/login/login";
import CustomButton from "@/components/ui/custom_button/custom_button";
import PageHead from "@/components/ui/page_head/page_head";
import { getAllData } from "@/libs/firebase/firebase";
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
    <>
      <PageHead head="Admin" />

      <CustomContainer>
        {session?.data ? (
          <>
            <AdminPanel />
          </>
        ) : null}
      </CustomContainer>
    </>
  );
};

export default Admin;

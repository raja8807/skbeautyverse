import AdminPanel from "@/components/screens/admin/admin_panel/admin_panel";
import LoginBox from "@/components/screens/admin/login/login";
import { useSession } from "next-auth/react";

const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");

import Link from "next/link";

const Admin = ({ homeData ,setCustomer,customer}) => {
  const session = useSession();

  // console.log(setCustomer);

  return (
    <CustomContainer>
      {session?.data ? (
        <>
          <Link href="admin/g/bridal">Edit Galley</Link>
          <AdminPanel homeData={homeData} />
        </>
      ) : (
        <LoginBox setCustomer={setCustomer} customer={customer}/>
      )}
    </CustomContainer>
  );
};

export default Admin;

export async function getServerSideProps(context) {
  //   console.log("aeoaen-------------------------->>>>");
  const limit = Math.floor(Math.random() * 40);
  try {
    const res = await fetch(`http://${context.req.headers.host}/api/homeData`);
    const homeData = await res.json();
    return { props: { homeData } };
  } catch (err) {
    console.log("errr--->", err);
    return { props: { images: "errr-->" + err.message } };
  }
}

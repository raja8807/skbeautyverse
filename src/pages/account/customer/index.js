import CustomButton from "@/components/ui/custom_button/custom_button";
import { fireBaseSignOut } from "@/components/firebase_auth/firebase_auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import firebase from "firebase/compat/app";

const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");
const {
  default: CustomSection,
} = require("@/components/ui/custom_section/custom_section");

import CustomerPortal from "@/components/screens/customer/customer_portal";

const CustomerPortalScreen = ({ customer, user }) => {
  const router = useRouter();
  useEffect(() => {
    if (
      !customer ||
      !customer.emailVerified ||
      !customer.displayName ||
      !customer.photoURL
    ) {
      router.replace("/account/login");
    }
  }, [customer, router]);

  if (
    customer &&
    customer.emailVerified &&
    customer.displayName &&
    customer.photoURL
  ) {
    return (
      <CustomContainer>
        <CustomButton
          clickHandler={() => {
            fireBaseSignOut();
          }}
        >
          Logout
        </CustomButton>
        <CustomerPortal customer={customer} user={user} />
      </CustomContainer>
    );
  } else {
    return null;
  }
};

export default CustomerPortalScreen;

export async function getServerSideProps(context) {
  try {
    const res = await fetch(
      `http://${context.req.headers.host}/api/customer?user=${context.query.user}`
    );
    const user = await res.json();
    return { props: { user: user } };
  } catch (err) {
    console.log("errr--->", err);
    return { props: { user: "errr-->" + err.message } };
  }
}

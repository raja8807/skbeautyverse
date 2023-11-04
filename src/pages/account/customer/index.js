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

const CustomerPortalScreen = ({ customer, bookings }) => {
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

  const customerBookings = bookings.filter((booking) => {
    return booking.customer?.customerId === customer?.uid;
  });

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
        <CustomSection head="Customer">
          <CustomerPortal customer={customer} customerBookings={customerBookings}/>
        </CustomSection>
      </CustomContainer>
    );
  } else {
    return null;
  }
};

export default CustomerPortalScreen;

export async function getServerSideProps(context) {
  try {
    console.log(firebase.auth().currentUser);
    const res = await fetch(`http://${context.req.headers.host}/api/booking`);
    const bookings = await res.json();
    return { props: { bookings } };
  } catch (err) {
    console.log("errr--->", err);
    return { props: { images: "errr-->" + err.message } };
  }
}

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Admin = ({ customer }) => {
  const session = useSession();
  const router = useRouter();

  // console.log(customer);
  // console.log(customer);

  useEffect(() => {
    if (session?.data) {
      router.replace("/account/admin");
      return;
    }

    if (customer) {
      console.log(customer);
      router.replace(`/account/customer?user=${customer.displayName}`);
      return;
    }

    if (!(session?.data && customer)) {
      router.replace("/account/login");
      return;
    }
  }, [customer, router, session]);

  return null;
};

export default Admin;

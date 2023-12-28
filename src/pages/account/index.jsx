import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Admin = ({ customer }) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.data) {
      router.replace("/account/admin");
      return;
    }

    if (customer) {
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

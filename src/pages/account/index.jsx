import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Admin = ({ clientSession }) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.data) {
      router.replace("/account/admin");
      return;
    }
    if (clientSession) {
      router.replace("/account/client");
      return;
    }

    router.replace("/account/login");
  }, [router, session]);

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Admin;

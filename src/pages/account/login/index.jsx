import LoginBox from "@/components/screens/admin/login/login";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginPage = ({ setCustomer, customer }) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.data) {
      router.replace("/account/admin");
    }
    if (
      customer &&
      customer.emailVerified &&
      customer.displayName &&
      customer.photoURL
    ) {
      router.replace(`/account/customer?user=${customer.displayName}`);
    }
  }, [customer, router, session]);

  return (
    <CustomContainer>
      <LoginBox setCustomer={setCustomer} customer={customer} />
    </CustomContainer>
  );
};

export default LoginPage;

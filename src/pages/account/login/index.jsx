import LoginBox from "@/components/screens/admin/login/login";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginPage = ({ clientSession }) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.data) {
      router.replace("/account/admin");
    }
    if (clientSession) {
      router.replace(`/account/client`);
    }
  }, [router, session,clientSession]);

  return (
    <CustomContainer>
      <LoginBox />
    </CustomContainer>
  );
};

export default LoginPage;

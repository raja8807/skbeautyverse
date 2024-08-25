import ClientScreen from "@/components/screens/account/client/client";
import SpinnerScreen from "@/components/ui/spinner_screen/spinner_screen";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ClientPage = ({ clientSession }) => {
  const router = useRouter();
  useEffect(() => {
    if (clientSession === null) {
        router.push("/account/login");
      }
  }, [clientSession]);

  if (clientSession) {
    return <ClientScreen clientSession={clientSession} />;
  }

  return <SpinnerScreen />;
};

export default ClientPage;

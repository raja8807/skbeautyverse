import ClientsScreen from "@/components/screens/admin/admin_panel/clients/clients";
import { getAllData } from "@/libs/firebase/firebase";
import React from "react";

const ClientsPage = ({ clientProfiles }) => {
  return <ClientsScreen clientProfiles={clientProfiles} />;
};

export default ClientsPage;

export async function getServerSideProps(context) {
  try {
    const clientProfiles = await getAllData("client_profile");

    return { props: { clientProfiles } };
  } catch (err) {
    return { props: { clientProfiles: [] } };
  }
}

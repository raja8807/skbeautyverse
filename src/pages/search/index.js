import SearchScreen from "@/components/screens/search/search";
import { getSession } from "next-auth/react";

const SearchPage = ({ profiles }) => {
  return <SearchScreen profiles={profiles} />;
};

export default SearchPage;

export async function getServerSideProps(context) {
  try {
    const session = await getSession();
    console.log(session);
    const res = await fetch(
      `http://${context.req.headers.host}/api/customer/search`,
      {
        method: "POST",
        body: session ? JSON.stringify(session) : null,
      }
    );
    const profiles = await res.json();

    return { props: { profiles } };
  } catch (err) {
    console.log("errr--->", err);
    return { props: { profiles: [] } };
  }
}

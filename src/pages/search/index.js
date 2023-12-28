import SearchScreen from "@/components/screens/search/search";

const SearchPage = ({ profiles }) => {
  
  return <SearchScreen profiles={profiles} />;
};

export default SearchPage;

export async function getServerSideProps(context) {
  try {
    const res = await fetch(
      `http://${context.req.headers.host}/api/customer/search`
    );
    const profiles = await res.json();

    return { props: { profiles } };
  } catch (err) {
    console.log("errr--->", err);
    return { props: { profiles: [] } };
  }
}

import Profile from "@/components/screens/profile/profile";

const UserProfile = ({ profile }) => {
  return (
    <div>
      {profile ? (
        <Profile profile={profile} />
      ) : (
        <div
          style={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Profile Not Found</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

export async function getServerSideProps(context) {
  //   console.log("aeoaen-------------------------->>>>");
  // const limit = Math.floor(Math.random() * 40);
  try {
    // console.log(context.query.userName);
    const res = await fetch(
      `http://${context.req.headers.host}/api/customer/${context.query.userName}`
    );
    const profile = await res.json();
    console.log(profile);
    return { props: { profile } };
  } catch (err) {
    console.log("errr--->", err);
    return { props: { err: "errr-->" + err.message } };
  }
}

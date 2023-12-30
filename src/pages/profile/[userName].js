import Profile from "@/components/screens/profile/profile";
import { getSession } from "next-auth/react";

const UserProfile = ({ profile, images }) => {
  return (
    <div>
      {profile ? (
        <Profile profile={profile} images={images} />
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
  try {
    const session = await getSession(context);

    const res = await fetch(
      `http://${context.req.headers.host}/api/customer/${context.query.userName}`,
      {
        method: "POST",
        body: session ? JSON.stringify(session) : null,
      }
    );
    const { user, images } = await res.json();

    return { props: { profile: user, images } };
  } catch (err) {
    console.log("errr--->", err);
    return { props: { err: "errr-->" + err.message } };
  }
}

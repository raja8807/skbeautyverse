const { Spinner } = require("react-bootstrap");
import styles from "../../login.module.scss";

const EmailVerification = ({
  sendVerificationEmail,
  isLoading,
  signOut,
  customer,
  reloadUser,
}) => {
  return (
    <>
      <small>Verification email has been sent to {customer.email}</small>
      <small
        onClick={async () => {
          await sendVerificationEmail();
        }}
      >
        Resend email
      </small>
      <small
        onClick={async () => {
         await reloadUser();
        }}
      >
        Verified? &nbsp;&nbsp;
        <span style={{ textDecoration: "underLine" }}>Click here</span>
      </small>
      {isLoading ? (
        <Spinner style={{ margin: "auto" }} />
      ) : (
        <input type="button" value="Logout" onClick={signOut} />
      )}
    </>
  );
};

export default EmailVerification;

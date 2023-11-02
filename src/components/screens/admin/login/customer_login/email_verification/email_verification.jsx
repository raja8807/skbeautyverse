const { Spinner } = require("react-bootstrap");
import styles from "../../login.module.scss";

const EmailVerification = ({
  sendVerificationEmail,
  isLoading,
  signOut,
  customer,
  setCheckVefied,
  reloadUser
}) => {
  return (
    <>
      <small>Verification Email Has been sent to {customer.email}</small>
      <small
        onClick={async () => {
          await sendVerificationEmail();
        }}
      >
        Resend Email
      </small>
      <small
        onClick={async () => {
            reloadUser()
        }}
      >
        Verified
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

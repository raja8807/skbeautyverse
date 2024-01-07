const { useState, useEffect } = require("react");
import { Spinner } from "react-bootstrap";
import styles from "../../login.module.scss";
import EmailVerification from "../email_verification/email_verification";
// import { signIn } from "next-auth/react";

const CustomerSinup = (props) => {
  const {
    setIsLogin,
    verified,
    signUp,
    signOut,
    sendVerificationEmail,
    isLoading,
    customer,
    error,
    setError,
    reloadUser,
    isLoginPage,
    setIsAdminLogin,
  } = props;

  const [values, setValues] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className={styles.loginBox}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await signUp(values.email, values.userName, values.password);
        }}
      >
        <p>Create Account</p>
        {verified === "no" ? (
          <EmailVerification
            isLoading={isLoading}
            sendVerificationEmail={sendVerificationEmail}
            signOut={signOut}
            customer={customer}
            reloadUser={reloadUser}
          />
        ) : (
          <>
            <input
              className={error ? styles.error : ""}
              placeholder="Email"
              id="signup_email"
              //   type="email"
              value={values.email}
              onChange={(e) => {
                const { value } = e.target;

                setValues((prev) => ({ ...prev, email: value }));
              }}
              required
              type="email"
            />

            <input
              placeholder="User Name (eg : your_name)"
              value={values.userName}
              className={error ? styles.error : ""}
              onChange={(e) => {
                const { value } = e.target;
                const valid = /^[a-z0-9_\.]+$/.exec(value);
                if (!!valid || value === "") {
                  setValues((prev) => ({
                    ...prev,
                    userName: value,
                  }));
                }
              }}
              required
              minLength="5"
              maxLength="20"
            />
            {error && <small>{error}</small>}
            <input
              className={error ? styles.error : ""}
              id="signup_pwd"
              placeholder="Password"
              type="password"
              value={values.password}
              onChange={(e) => {
                const { value } = e.target;
                setValues((prev) => ({ ...prev, password: value }));
              }}
              required
            />
            <input
              className={error ? styles.error : ""}
              id="signup_con_pwd"
              placeholder="Confirm password"
              type="password"
              value={values.confirmPassword}
              onChange={(e) => {
                const { value } = e.target;
                setValues((prev) => ({ ...prev, confirmPassword: value }));
              }}
              required
            />
            {isLoading ? (
              <Spinner style={{ margin: "auto" }} />
            ) : (
              <input type="submit" value="Create" />
            )}
          </>
        )}

        {!customer && (
          <small>
            {isLoginPage && (
              <>
                <span
                  onClick={() => {
                    setIsAdminLogin(true);
                  }}
                >
                  Admin Login
                </span>
                &nbsp; &nbsp;
              </>
            )}
            |
            <span
              onClick={() => {
                setError(false);
                setIsLogin(true);
              }}
            >
              &nbsp; &nbsp; Customer Login
            </span>
          </small>
        )}
      </form>
    </div>
  );
};

export default CustomerSinup;

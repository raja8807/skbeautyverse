const { useState, useEffect } = require("react");
import { Spinner } from "react-bootstrap";
import styles from "../login.module.scss";
// import { signIn } from "next-auth/react";
import CustomerSignup from "./custtomer_signup/custtomer_signup";

import { getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  //   updatePhoneNumber,
  //   sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import EmailVerification from "./email_verification/email_verification";

import fireBaseCustomerAuth from "@/components/constants/firebase_config";

const CustomerLogin = (props) => {
  const { setIsAdminLogin, setCustomer, customer, isLoginPage } = props;

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signOut = () => {
    setVerified(null);
    fireBaseCustomerAuth.signOut();
  };

  const updateCustomer = async (displayName, phoneNumber) => {
    setIsLoading(true);
    setError(false);
    try {
      await firebase.auth().currentUser.updateProfile({
        displayName,
        photoURL: phoneNumber,
      });
      setError(false);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(true);
    }
  };

  async function signIn(email, password) {
    try {
      result = await signInWithEmailAndPassword(
        fireBaseCustomerAuth,
        values,
        email,
        values.password
      );
    } catch (e) {}
  }
  const sendVerificationEmail = async () => {
    setIsLoading(true);
    setError(false);
    try {
      await firebase.auth().currentUser.sendEmailVerification();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(true);
    }
  };

  const signUp = async (email, password) => {
    setIsLoading(true);
    setError(false);

    try {
      result = await createUserWithEmailAndPassword(
        fireBaseCustomerAuth,
        email,
        password
      );
      await sendVerificationEmail();
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setError(true);
    }
  };

  const reloadUser = async () => {
    setIsLoading(true);
    await customer.reload();
    setCustomer(firebase.auth().currentUser);
    if (customer.emailVerified) {
      setVerified(true);
      setIsLogin(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setError(false);
    console.log("ok");
    firebase.auth().onAuthStateChanged(async (user) => {
      setCustomer(user);
      if (user && !user.emailVerified) {
        setVerified("no");
      }
    });
  }, [setCustomer]);

  async function signIn(email, password) {
    setIsLoading(true);
    setError(false);
    try {
      result = await signInWithEmailAndPassword(
        fireBaseCustomerAuth,
        email,
        password
      );
      setIsLoading(false);
    } catch (e) {
      console.log("err--> ", e);
      setIsLoading(false);
      setError(true);
    }
  }

  const [isLogin, setIsLogin] = useState(true);

  const [updateValues, setUpdateValues] = useState({
    name: "",
    phoneNumber: "",
  });

  return isLogin ? (
    <div className={styles.loginBox}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await signIn(values.email, values.password);
        }}
      >
        <p>Customer Login</p>
        {customer ? (
          <>
            {verified === "no" ? (
              <EmailVerification
                sendVerificationEmail={sendVerificationEmail}
                isLoading={isLoading}
                signOut={signOut}
                customer={customer}
                setCustomer={setCustomer}
                reloadUser={reloadUser}
              />
            ) : (
              <>
                <small>Welcome {customer.displayName}</small>
                {!customer.displayName && (
                  <>
                    <small>Please update your profile to continue</small>
                    <input
                      placeholder="Name"
                      value={updateValues.name}
                      onChange={(e) => {
                        const { value } = e.target;
                        setUpdateValues((prev) => ({ ...prev, name: value }));
                      }}
                    />
                    <input
                      placeholder="Pnone Number"
                      value={updateValues.phoneNumber}
                      onChange={(e) => {
                        const { value } = e.target;
                        setUpdateValues((prev) => ({
                          ...prev,
                          phoneNumber: value,
                        }));
                      }}
                    />

                    {isLoading ? (
                      <Spinner style={{ margin: "auto" }} />
                    ) : (
                      <input
                        onClick={async () => {
                          await updateCustomer(
                            updateValues.name,
                            updateValues.phoneNumber
                          );
                        }}
                        type="button"
                        value="Update"
                      />
                    )}
                  </>
                )}
                <input
                  onClick={() => {
                    signOut();
                  }}
                  type="button"
                  value="logout"
                />
              </>
            )}
          </>
        ) : (
          <>
            {verified == "no" ? (
              <EmailVerification
                sendVerificationEmail={sendVerificationEmail}
                isLoading={isLoading}
                signOut={signOut}
                customer={customer}
                reloadUser={reloadUser}
              />
            ) : (
              <>
                <input
                  className={error ? styles.error : ""}
                  placeholder="email"
                  //   type="email"
                  value={values.email}
                  onChange={(e) => {
                    const { value } = e.target;

                    setValues((prev) => ({ ...prev, email: value }));
                  }}
                />
                <input
                  className={error ? styles.error : ""}
                  placeholder="Password"
                  type="password"
                  value={values.password}
                  onChange={(e) => {
                    const { value } = e.target;
                    setValues((prev) => ({ ...prev, password: value }));
                  }}
                />
                {isLoading ? (
                  <Spinner style={{ margin: "auto" }} />
                ) : (
                  <input type="submit" value="login" />
                )}
              </>
            )}
          </>
        )}

        {!customer && (
          <small>
            {isLoginPage && (
              <>
                <span
                  onClick={() => {
                    setError(false);

                    setIsAdminLogin(true);
                  }}
                >
                  Admin Login
                </span>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              </>
            )}
            <span
              onClick={() => {
                setError(false);
                setIsLogin(false);
              }}
            >
              Create Account
            </span>
          </small>
        )}
      </form>
    </div>
  ) : (
    <CustomerSignup
      verified={verified}
      signUp={signUp}
      setIsLogin={setIsLogin}
      setCustomer={setCustomer}
      signOut={signOut}
      sendVerificationEmail={sendVerificationEmail}
      isLoading={isLoading}
      customer={customer}
      error={error}
      setError={setError}
      reloadUser={reloadUser}
      isLoginPage={isLoginPage}
      setIsAdminLogin={setIsAdminLogin}
    />
  );
};

export default CustomerLogin;

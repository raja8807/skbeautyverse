const { useState, useEffect } = require("react");
import { Spinner } from "react-bootstrap";
import styles from "../login.module.scss";
// import { signIn } from "next-auth/react";
import CustomerSignup from "./custtomer_signup/custtomer_signup";

// import { getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import EmailVerification from "./email_verification/email_verification";

import fireBaseCustomerAuth from "@/components/constants/firebase_config";
import { useRouter } from "next/router";
import axios from "axios";
import { Google } from "react-bootstrap-icons";

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

  const router = useRouter();
  const updateCustomer = async (displayName, phoneNumber) => {
    setIsLoading(true);
    setError(false);
    try {
      await firebase.auth().currentUser.updateProfile({
        displayName,
        photoURL: phoneNumber,
      });
      const res = await axios.post("/api/customer", {
        name: displayName,
        phoneNumber,
        email: customer.email,
        customerId: customer.uid,
      });
      //   console.log(res);
      setError(false);
      setIsLoading(false);
      if (isLoginPage) {
        router.reload();
      } else {
        setCustomer((prev) => ({
          ...prev,
          displayName,
          photoURL: phoneNumber,
        }));
      }
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
    if (customer && !customer.emailVerified) {
      setVerified("no");
    }
  }, [customer]);

//   useEffect(() => {
//     firebase.auth().onAuthStateChanged(async (user) => {
//       setCustomer(user);
//     });
//   }, [setCustomer]);

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
      //   console.log("err--> ", e);
      setIsLoading(false);
      setError(true);
    }
  }

  const [isLogin, setIsLogin] = useState(true);

  const [updateValues, setUpdateValues] = useState({
    name: "",
    phoneNumber: "",
  });

  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
                <button type="button" onClick={signInWithGoogle}>
                  <Google /> &nbsp; Login With Google{" "}
                </button>
                {/* <div className="login-buttons">
                  <button
                    className="login-provider-button"
                    onClick={signInWithGoogle}
                    type="button"
                  >
                    <img
                      src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
                      alt="google icon"
                    />
                    <span> Continue with Google</span>
                  </button>
                </div> */}
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

const { useState, useEffect } = require("react");
import { Spinner } from "react-bootstrap";
import styles from "../login.module.scss";
import CustomerSignup from "./custtomer_signup/custtomer_signup";
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

const CustomerLogin = (props) => {
  const { setIsAdminLogin, setCustomer, customer, isLoginPage } = props;
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const signOut = () => {
    setVerified(null);
    fireBaseCustomerAuth.signOut();
  };

  const router = useRouter();

  const updateCustomer = async (displayName, phoneNumber) => {
    setMessage(null);
    setIsLoading(true);
    setError(false);
    try {
      if (customer.uid) {
        await axios.put("/api/customer", {
          ... customer,
          name: displayName,
          phoneNumber,
          email: customer.email,
          customerId: customer.uid,
          userName: updateValues.userName,
        });

        await firebase.auth().currentUser.updateProfile({
          displayName:updateValues.userName,
          photoURL: phoneNumber,
        });
      }

      // setCustomer((prev) => ({ ...prev, userName: updateValues.userName }));
      setError(false);
      setIsLoading(false);
      if (isLoginPage) {
        router.replace(`/account/customer?user=${updateValues.userName}`);
      } else {
        setCustomer((prev) => ({
          ...prev,
          displayName,
          photoURL: phoneNumber,
          userName: updateValues.userName,
        }));
      }
    } catch (err) {
      setMessage(err.message);
      if (err?.response?.data === "already exist") {
        setMessage("User name already exist please choose another name");
      }
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
      const result = await createUserWithEmailAndPassword(
        fireBaseCustomerAuth,
        email,
        password
      );

      const x = await axios.post("/api/customer", {
        email: result.user.email,
        customerId: result.user.uid,
      });

      await sendVerificationEmail();
    } catch (e) {
      console.log(e);
      setError(true);
    }
    setIsLoading(false);
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

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      setCustomer(user);
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

  return isLogin ? (
    <div className={styles.loginBox}>
      <p>MUA Login</p>
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
            <form
              className={styles.x}
              name="xx"
              id="xx"
              onSubmit={async (e) => {
                e.preventDefault();
                await updateCustomer(
                  updateValues.name,
                  updateValues.phoneNumber
                );
              }}
            >
              <small>Welcome {customer.displayName}</small>
              {!customer.displayName && (
                <>
                  <small>Please update your profile to continue</small>
                  <input
                    placeholder="User Name (eg : your_name)"
                    value={updateValues.userName}
                    onChange={(e) => {
                      const { value } = e.target;
                      const valid = /^[a-z0-9_\.]+$/.exec(value);
                      if (!!valid || value === "") {
                        setUpdateValues((prev) => ({
                          ...prev,
                          userName: value,
                        }));
                      }
                    }}
                    required
                    minLength="5"
                    maxLength="20"
                  />
                  {message && <small>{message}</small>}
                  <input
                    placeholder="Name"
                    value={updateValues.name}
                    onChange={(e) => {
                      const { value } = e.target;
                      setUpdateValues((prev) => ({ ...prev, name: value }));
                    }}
                    required
                    minLength="5"
                    maxLength="100"
                  />
                  <input
                    placeholder="Phone Number"
                    value={updateValues.phoneNumber}
                    onChange={(e) => {
                      const { value } = e.target;
                      const valid = /^[0-9_\.]+$/.exec(value);
                      if ((valid && value.length !== 11) || value === "") {
                        setUpdateValues((prev) => ({
                          ...prev,
                          phoneNumber: value,
                        }));
                      }
                    }}
                    required
                    minLength="10"
                    maxLength="10"
                  />

                  {isLoading ? (
                    <Spinner style={{ margin: "auto" }} />
                  ) : (
                    <input
                      type="submit"
                      value="Update" 
                      name="xx"
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
              {/* <small>{error}</small> */}
            </form>
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
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await signIn(values.email, values.password);
              }}
            >
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
            </form>
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
              &nbsp; &nbsp;
            </>
          )}
          |
          <span
            onClick={() => {
              setError(false);
              setIsLogin(false);
            }}
          >
            &nbsp; &nbsp; Create Account
          </span>
        </small>
      )}
      {/* </form> */}
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

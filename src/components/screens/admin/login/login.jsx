const { useState, use } = require("react");
import { Spinner } from "react-bootstrap";
import styles from "./login.module.scss";
import { signIn } from "next-auth/react";
import CustomerLogin from "./customer_login/customer_login";

const LoginBox = ({setCustomer,customer}) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = async () => {
    //  try{
    setError(null);
    setIsLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (res.status === 401) {
      setError(true);
    }
    setIsLoading(false);
  };

  const [isAdminLogin, setIsAdminLogin] = useState(false);

  return (
    <>
      {isAdminLogin ? (
        <div className={styles.loginBox}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await handleAdminLogin();
            }}
          >
            <p>Admin Login</p>
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
            <small
              onClick={() => {
                setIsAdminLogin(false);
              }}
            >
              <span>Customer Login</span>
            </small>
          </form>
          {/* <p>Admin Login</p> */}
        </div>
      ) : (
        <CustomerLogin setIsAdminLogin={setIsAdminLogin} setCustomer={setCustomer} customer={customer}/>
      )}
    </>
  );
};

export default LoginBox;

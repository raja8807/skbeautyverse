const { useState, use } = require("react");
import { Spinner } from "react-bootstrap";
import styles from "./login.module.scss";
import { signIn, useSession } from "next-auth/react";

const LoginBox = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  console.log(values);

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

  const session = useSession();

  console.log(session);

  return (
    <div className={styles.loginBox}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleAdminLogin();
        }}
      >
        <p>Login</p>
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
    </div>
  );
};

export default LoginBox;

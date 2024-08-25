import { useState } from "react";
import styles from "../login.module.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase/firebase";
import { customFont2 } from "@/styles/fonts/fonts";

const CustomerLogin = (props) => {
  const { setIsAdminLogin } = props;
  const [values, setValues] = useState({
    email: "",
    password: "",
  });


  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      console.log(user);
    } catch (error) {
      console.log(error);

      alert("Error");
    }
  };

  return (
    <div className={styles.loginBox}>
      <div className={styles.img} />

      <form
        className={styles.x}
        name="xx"
        id="xx"
        onSubmit={async (e) => {
          e.preventDefault();
          await signIn();
        }}
      >
        <p className={customFont2}>Welcome to Sk Beauty-Verse</p>
        <input
          placeholder="Email"
          value={values.email}
          onChange={(e) => {
            setValues((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <input
          placeholder="Password"
          type="password"
          value={values.password}
          onChange={(e) => {
            setValues((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <input type="submit" value="login" />
        <small
          onClick={() => {
            setIsAdminLogin(true);
          }}
        >
          <span>Admin Login</span>
        </small>
        {/* <small>{error}</small> */}
      </form>
    </div>
  );
};

export default CustomerLogin;

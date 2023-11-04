import { useEffect, useState } from "react";
import styles from "./cutomer_profile.module.scss";

const CustomerProfile = ({ customer }) => {
  const [values, setValues] = useState({
    displayName: customer.displayName,
    phone: customer.photoURL,
  });

  useEffect(() => {
    setValues({
      displayName: customer.displayName,
      phone: customer.photoURL,
    });
  }, [customer]);

  return (
    <div className={styles.customerProfile}>
      <div className={styles.top}>
        <p>My Profile</p>
      </div>
      <form>
        <div>
          <label>Name</label>
          <input
            placeholder="Name"
            value={values.displayName}
            onChange={(e) => {
              const { value } = e.target;
              setValues((prev) => ({ ...prev, displayName: value }));
            }}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            placeholder="Phone"
            value={values.phone}
            onChange={(e) => {
              const { value } = e.target;
              setValues((prev) => ({ ...prev, phone: value }));
            }}
          />
        </div>
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default CustomerProfile;

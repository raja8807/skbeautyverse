import { useState } from "react";
import styles from "./about.module.scss";

const EditAbout = ({ user, updateCustomer, readOnly }) => {
  console.log(readOnly);

  const [value, setValue] = useState(user.about);

  return (
    <div className={styles.editAbout}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await updateCustomer(
            user.displayName,
            user.phoneNumber,
            user.imageUrl,
            value
          );
        }}
      >
        {readOnly ? (
          <p>{value}</p>
        ) : (
          <textarea
            value={value}
            placeholder="Say About Yourself.."
            rows={6}
            onChange={(e) => {
              const { value } = e.target;
              setValue(value);
            }}
            disabled={readOnly}
          />
        )}
        {!readOnly && <input type="submit" />}
      </form>
      <br />
    </div>
  );
};

export default EditAbout;

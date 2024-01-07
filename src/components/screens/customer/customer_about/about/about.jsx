import { useState } from "react";
import styles from "./about.module.scss";

const EditAbout = ({ user, updateCustomer, readOnly }) => {
  const [value, setValue] = useState(user?.about);
  
  const [length, setLenght] = useState(() => {
    if (user?.about) {
      const { about } = user;
      const splitted = about.split(" ");
      return splitted.filter((s) => s !== "").length;
    }
    return 0;
  });

  const maxLen = 100;

  return (
    <div className={styles.editAbout}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await updateCustomer(
            user?.displayName,
            user?.phoneNumber,
            user?.imageUrl,
            value
          );
        }}
      >
        {readOnly ? (
          <p>{value}</p>
        ) : (
          <div className={styles.abt}>
            <textarea
              value={value}
              placeholder="Say About Yourself.."
              rows={10}
              onChange={(e) => {
                const { value } = e.target;
                setValue(value)

                // if (length < maxLen) {
                //   const splitted = value.split(" ");
                //   splitted.filter((s) => s !== "").length;
                //   setLenght(splitted.filter((s) => s !== "").length);
                //   setValue(value);
                // }
              }}
              disabled={readOnly}
            />
            {/* <p>
              {length}/{maxLen}
            </p> */}
          </div>
        )}
        {!readOnly && <input type="submit" />}
      </form>
      <br />
    </div>
  );
};

export default EditAbout;

import CustomButton from "@/components/ui/custom_button/custom_button";
import styles from "./contact_form.module.scss";
import fonts from "@/components/fonts/fonts";
import { useState } from "react";
// import { Spinner } from "react-bootstrap";

const ContactForm = ({
  type = "black",
  initialMessage = "HI, I want to know More...",
}) => {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    message: initialMessage,
  });

  const [status, setStatus] = useState("idle");

  const sendMessage = ()=>{
    setStatus('loading')
    try{
      setStatus('success')
    }catch(err){
      setStatus('error')
    }
  }

  return (
    <form className={`${styles.contactForm} ${styles[type]}`}>
      <p className={fonts.lora}>Get In Touch</p>
      <input
        placeholder="Your Name"
        value={values.name}
        onChange={(e) => {
          const { value } = e.target;
          setValues((prev) => ({ ...prev, name: value }));
        }}
      />
      <input
        placeholder="Your Phone Number"
        value={values.phone}
        onChange={(e) => {
          const { value } = e.target;
          setValues((prev) => ({ ...prev, phone: value }));
        }}
      />
      <input
        placeholder="Your Email"
        value={values.email}
        onChange={(e) => {
          const { value } = e.target;
          setValues((prev) => ({ ...prev, email: value }));
        }}
      />
      <textarea
        placeholder="Your Message"
        rows="5"
        value={values.message}
        onChange={(e) => {
          const { value } = e.target;
          setValues((prev) => ({ ...prev, message: value }));
        }}
      />
      {status !== "success" && status !== "error" && (
        <CustomButton
          type={type === "black" ? "gold" : "black2"}
          clickHandler={(e) => {
            e.preventDefault();
            sendMessage()
          }}
          // disabled
        >
          {status === "loading" ? "Please Wait.." : "Send Message"}
        </CustomButton>
      )}

      {status === "success" && (
        <div className={`${styles.status} ${styles[status]}`}>Success</div>
      )}
      {status === "error" && (
        <div className={`${styles.status} ${styles[status]}`}>
          Something went wrong
        </div>
      )}
    </form>
  );
};

export default ContactForm;

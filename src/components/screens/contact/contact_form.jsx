import CustomButton from "@/components/ui/custom_button/custom_button";
import styles from "./contact_form.module.scss";
import fonts from "@/components/fonts/fonts";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import Link from "next/link";
// import {useRouter} from 'next/router'
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

  const linkRef = useRef(null);

  const [status, setStatus] = useState("idle");

  const sendMessage = async () => {
    setStatus("loading");
    try {
      await axios.post("https://formspree.io/f/myyqlnel", {
        email: values.email,
        message: values,
      });
      linkRef.current.click();
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <form className={`${styles.contactForm} ${styles[type]}`}
    onSubmit={async (e)=>{
      e.preventDefault()
      await sendMessage()
    }}
    >
      <p className={fonts.lora}>Get In Touch</p>
      <input
        placeholder="Your Name"
        value={values.name}
        onChange={(e) => {
          const { value } = e.target;
          setValues((prev) => ({ ...prev, name: value }));
        }}
        required
      />
      <input
        placeholder="Your Phone Number"
        value={values.phone}
        onChange={(e) => {
          const { value } = e.target;
          setValues((prev) => ({ ...prev, phone: value }));
        }}
        required
      />
      <input
        placeholder="Your Email"
        value={values.email}
        onChange={(e) => {
          const { value } = e.target;
          setValues((prev) => ({ ...prev, email: value }));
        }}
        required
        type="email"
      />
      <textarea
        placeholder="Your Message"
        rows="5"
        value={values.message}
        onChange={(e) => {
          const { value } = e.target;
          setValues((prev) => ({ ...prev, message: value }));
        }}
        required
      />
      {status !== "success" && status !== "error" && (
        <>
        <input type="submit" disabled={status === "loading"} value={status === "loading" ? "Please Wait.." : "Send Message"}/>
          <Link
            ref={linkRef}
            target="_blank"
            href={`https://wa.me/918610030499?text=${values.message}`}
          />
        </>
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

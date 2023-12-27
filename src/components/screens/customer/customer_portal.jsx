import CustomerProfile from "./cutomer_profile/cutomer_profile";
import CustomerAbout from "./customer_about/customer_about";
import { useState } from "react";
import firebase from "firebase/compat/app";
import { useRouter } from "next/router";
import axios from "axios";

const { Row, Col } = require("react-bootstrap");

const CustomerPortal = ({ customer, user, images }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [file, setFile] = useState(null);

  const router = useRouter();

  const updateCustomer = async (
    displayName,
    phoneNumber,
    imageUrl,
    about,
    location
  ) => {
    setIsLoading(true);
    setError(false);
    try {
      if (customer.uid) {
        let newUrl = imageUrl;
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "user_image");
          const uploadRes = await fetch(
            "https://api.cloudinary.com/v1_1/dm0mza7qt/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          const uploadData = await uploadRes.json();
          newUrl = uploadData.url;
        }

        await axios.put("/api/customer", {
          name: displayName,
          phoneNumber,
          email: customer.email,
          customerId: customer.uid,
          imageUrl: newUrl,
          about: about ? about : user.about ? user.about : null,
          location,
        });

        if (user.phoneNumber !== phoneNumber) {
          await firebase.auth().currentUser.updateProfile({
            photoURL: phoneNumber,
          });
        }
      }
      setError(false);
      setIsLoading(false);
      router.reload();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(true);
    }
  };

  return (
    <Row>
      <Col md={4}>
        <CustomerProfile
          customer={customer}
          user={user}
          updateCustomer={updateCustomer}
          isLoading={isLoading}
          error={error}
          setFile={setFile}
        />
      </Col>
      <Col>
        <CustomerAbout
          images={images}
          user={user}
          updateCustomer={updateCustomer}
        />
      </Col>
    </Row>
  );
};

export default CustomerPortal;

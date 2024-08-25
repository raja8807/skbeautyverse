import CustomButton from "@/components/ui/custom_button/custom_button";
import { auth, getDataByQuery } from "@/libs/firebase/firebase";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomSection from "@/components/ui/custom_section/custom_section";
import styles from "./client.module.scss";
import { Col, Image, Row } from "react-bootstrap";
import SpinnerScreen from "@/components/ui/spinner_screen/spinner_screen";
import { customFont1, customFont2 } from "@/styles/fonts/fonts";
import Sittings from "./sittings/sittings";

const ClientScreen = ({ clientSession }) => {
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetChClient = async () => {
    try {
      setIsLoading(true);
      const res = await getDataByQuery("client_profile", [
        "uid",
        "==",
        clientSession?.uid,
      ]);
      setClient(res?.[0]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (clientSession?.uid) {
      fetChClient();
    }
  }, []);

  return (
    <div>
      <br />
      <br />
      <CustomContainer>
        <CustomSection>
          <CustomButton
            clickHandler={() => {
              signOut(auth);
            }}
          >
            Logout
          </CustomButton>
          <hr />
          {isLoading ? (
            <SpinnerScreen />
          ) : (
            <div className={styles.ClientScreen}>
              {client && (
                <>
                  <br />
                  <Row>
                    <Col xs={12} md={4}>
                      <Image
                        src={client?.profileImg || "/images/user.jpg"}
                        fluid
                      />
                    </Col>
                    <Col xs={12} md={8}>
                      <div className={styles.right}>
                        <h3 className={customFont2}>
                          Welcome {client?.name}..!
                        </h3>
                        <p>Phone : {client?.phone}</p>
                        <p>Email : {client?.email}</p>
                      </div>
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <Sittings client={client} />
                </>
              )}
            </div>
          )}
        </CustomSection>
      </CustomContainer>
    </div>
  );
};

export default ClientScreen;

import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomSection from "@/components/ui/custom_section/custom_section";
import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import styles from "./clients.module.scss";
import ClientProfile from "./client_profile/client_profile";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { getAllData } from "@/libs/firebase/firebase";
import SpinnerScreen from "@/components/ui/spinner_screen/spinner_screen";
// import userImg from '/images/user.jpg'

const ClientCard = ({ data, setShowProfileFor }) => {
  return (
    <Col xs={12} md={6} lg={4}>
      <div
        className={styles.ClientCard}
        onClick={() => {
          setShowProfileFor(data);
        }}
      >
        <div className={styles.left}>
          <div
            style={{
              backgroundImage: data.profileImg
                ? `url(${data.profileImg})`
                : "url(/images/user.jpg)",
            }}
          />
        </div>
        <div className={styles.right}>
          <p className={styles.name}>{data?.name}</p>
          <p className={styles.loc}>{data.location}</p>
          <p className={styles.loc}>{data.phone}</p>
        </div>
      </div>
    </Col>
  );
};

const ClientsScreen = ({clientProfiles}) => {
  const [profiles, setProfiles] = useState(clientProfiles || []);
  const [showProfileFor, setShowProfileFor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  return (
    <div>
      {isLoading && <SpinnerScreen />}
      <br />
      <br />
      <br />
      <br />
      <div>
        <CustomContainer>
          <CustomSection head="Clients">
            {showProfileFor ? (
              <ClientProfile
                profile={showProfileFor}
                setShowProfileFor={setShowProfileFor}
                setProfiles={setProfiles}
                setIsLoading={setIsLoading}
                
              />
            ) : (
              <>
                <CustomButton href={"/account/admin"}>Back</CustomButton>
                &nbsp; &nbsp;
                <CustomButton
                  clickHandler={() => {
                    setShowProfileFor("new");
                  }}
                >
                  Add New Client
                </CustomButton>
                <hr />
                <Row>
                  {profiles.map((profile) => {
                    return (
                      <ClientCard
                        key={profile.id}
                        data={profile}
                        setShowProfileFor={setShowProfileFor}
                      />
                    );
                  })}
                </Row>
              </>
            )}
          </CustomSection>
        </CustomContainer>
      </div>
    </div>
  );
};

export default ClientsScreen;

import CustomContainer from "@/components/ui/custom_container/custom_container";
import ProfileDetails from "./profile_details/profile_details";
import CustomerAbout from "../customer/customer_about/customer_about";

const { Row, Col } = require("react-bootstrap");

const Profile = ({ profile, images }) => {
  return (
    <CustomContainer>
      <Row>
        <Col md={4}>
          <ProfileDetails profile={profile} />
        </Col>
        <Col>
          <CustomerAbout user={profile} readOnly={true} images={images} />
        </Col>
      </Row>
    </CustomContainer>
  );
};

export default Profile;

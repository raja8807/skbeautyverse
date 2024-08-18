import CustomButton from "@/components/ui/custom_button/custom_button";
import { signOut } from "next-auth/react";
import { Col, Image, Row } from "react-bootstrap";
import SERVICE_CATEGORIES from "@/components/constants/service_categories";
import styles from "./admin_panel.module.scss";
import { useState } from "react";
import ServicesPanel from "./service_panel/service_panel";

const Service = ({ data, setCurrentCategory }) => {
  const { title, img } = data;

  return (
    <Col xs={6} md={6} lg={3}>
      <div
        className={styles.cat}
        onClick={() => {
          setCurrentCategory(data);
        }}
      >
        <Image src={`/images/categories/${img}`} fluid width={150} alt="cat" />
        <p>{title}</p>
      </div>
    </Col>
  );
};

const AdminPanel = () => {
  const [currentCategory, setCurrentCategory] = useState(null);

  return (
    <div>
      <CustomButton
        clickHandler={() => {
          signOut();
        }}
      >
        Logout
      </CustomButton>
      <br />
      <br />
      <br />
      {currentCategory ? (
        <ServicesPanel
          service={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
      ) : (
        <Row>
          {SERVICE_CATEGORIES.map((c) => (
            <Service
              key={c.id}
              data={c}
              setCurrentCategory={setCurrentCategory}
            />
          ))}
          <Service
            data={{
              title: "Blogs",
              img: "blog.png",
              isBlog: true,
            }}
            setCurrentCategory={setCurrentCategory}
          />
        </Row>
      )}
    </div>
  );
};

export default AdminPanel;

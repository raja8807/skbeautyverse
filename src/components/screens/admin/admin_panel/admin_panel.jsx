import CustomButton from "@/components/ui/custom_button/custom_button";
import { signOut } from "next-auth/react";
import { Col, Image, Row } from "react-bootstrap";
import SERVICE_CATEGORIES from "@/components/constants/service_categories";
import styles from "./admin_panel.module.scss";
import { useEffect, useState } from "react";
import ServicesPanel from "./service_panel/service_panel";
import { deletData, getAllData, updateData } from "@/libs/firebase/firebase";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomSection from "@/components/ui/custom_section/custom_section";

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

  const [reviews, setReviews] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getAllData("reviews");
      setReviews(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <>
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

          <CustomContainer>
            <CustomSection head="reviews">
              <Row>
                {reviews.map((r, ridx) => (
                  <Col key={r.id} xs={12} md={6}>
                    <div className={styles.review}>
                      <div className={styles.left}>
                        <Image src={r.img} fluid alt="xx" />
                      </div>
                      <div className={styles.right}>
                        <p>{r.name}</p>
                        <p>{r.message}</p>
                        <CustomButton
                          clickHandler={async () => {
                            try {
                              const res = await updateData(
                                "reviews",
                                {
                                  ...r,
                                  isApproved: r.isApproved ? false : true,
                                },
                                r.id
                              );
                              setReviews((prev) => {
                                const rs = [...prev];
                                rs[ridx] = {
                                  ...r,
                                  isApproved: r.isApproved ? false : true,
                                };
                                return rs;
                              });
                            } catch (error) {
                              alert("error");
                            }
                          }}
                        >
                          {r.isApproved ? "Unpin" : "Pin"}
                        </CustomButton>
                        &nbsp; &nbsp;
                        <CustomButton
                          clickHandler={async () => {
                            try {
                              await deletData("reviews", r.id);
                              setReviews((prev) =>
                                prev.filter((p, i) => i !== ridx)
                              );
                            } catch (error) {
                              alert(error);
                            }
                          }}
                        >
                          Delete
                        </CustomButton>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </CustomSection>
          </CustomContainer>
        </>
      )}
    </div>
  );
};

export default AdminPanel;

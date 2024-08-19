import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomSection from "@/components/ui/custom_section/custom_section";
import React, { useState } from "react";
import styles from "./testimonials.module.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { Image, Modal } from "react-bootstrap";
import { addData, uploadFile } from "@/libs/firebase/firebase";
import { v4 } from "uuid";

const TestimonialsSection = ({ reviews }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [showNewReview, setSHowNewReview] = useState(false);
  const [values, setValues] = useState({
    name: "",
    message: "",
  });

  const [file, setFile] = useState(null);

  const submitReview = async () => {
    try {
      const url = await uploadFile(file, "review_images");
      const id = v4();

      const res = await addData(
        "reviews",
        {
          id,
          ...values,
          img: url,
        },
        id
      );

      setSHowNewReview(false);
    } catch {
      alert("Error");
    }
  };

  return (
    <div className={styles.TestimonialsSection}>
      <Modal
        show={showNewReview}
        centered
        onHide={() => {
          setSHowNewReview(false);
        }}
      >
        <Modal.Header closeButton>Add Review</Modal.Header>
        <Modal.Body>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
            }}
            className={styles.form}
          >
            <input
              type="file"
              accept=".jpg, .png"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <Image
              src={file ? URL.createObjectURL(file) : "/images/user.jpg"}
              width={100}
              fluid
              alt="user"
            />
            <input
              type="text"
              placeholder="Name"
              value={values.name}
              onChange={(e) => {
                setValues((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
            <textarea
              placeholder="Message"
              value={values.message}
              onChange={(e) => {
                setValues((prev) => ({ ...prev, message: e.target.value }));
              }}
              rows={3}
            />
            <CustomButton
              variant={2}
              disabled={!file || !values.name || !values.message}
              clickHandler={submitReview}
            >
              Submit Review
            </CustomButton>
          </form>
        </Modal.Body>
      </Modal>
      <div className={styles.bg}></div>
      <CustomSection head="Testimonials">
        <CustomContainer>
          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            showDots={true}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            transitionDuration={5000}
            containerClass="carousel-container"
            arrows={false}
            dotListClass="custom-dot-list-style"
          >
            {reviews.map((review) => {
              return (
                <div className={styles.item} key={review?._id}>
                  <Image
                    src={review.img}
                    fluid
                    width={150}
                    height={150}
                    alt="img"
                    className={styles.img}
                  />

                  <div>
                    <h2>{review.name}</h2>
                    <p>{review.message}</p>
                  </div>
                </div>
              );
            })}
          </Carousel>
          <div className={styles.btn}>
            <CustomButton
              variant={2}
              clickHandler={() => {
                setSHowNewReview(true);
              }}
            >
              Add a Review
            </CustomButton>
          </div>
        </CustomContainer>
      </CustomSection>
    </div>
  );
};

export default TestimonialsSection;

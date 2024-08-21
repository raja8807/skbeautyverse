import CustomButton from "@/components/ui/custom_button/custom_button";
import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./blogs.module.scss";
import Link from "next/link";
import CustomSection from "@/components/ui/custom_section/custom_section";
import CustomContainer from "@/components/ui/custom_container/custom_container";

const BlogCard = ({ data }) => {
  const { rows, title, id, description } = data;
  return (
    <Col xs={12} md={6} lg={4} data-aos="fade-up">
      <Link href={`/blogs/${id}`}>
        <div className={styles.BlogCard}>
          <div
            className={styles.img}
            style={{
              backgroundImage: `url(${rows[0].img})`,
            }}
          />
          <h4>{title}</h4>
          <p>{description}</p>
          <CustomButton variant={2}>Know More</CustomButton>
        </div>
      </Link>
    </Col>
  );
};

const BlogsScreen = ({ blogs }) => {
  console.log(blogs);

  return (
    <div>
      <br />
      <br />
      <br />
      <CustomSection head="Blogs">
        <CustomContainer>
          <Row>
            {blogs.map((b) => {
              return <BlogCard key={b.id} data={b} />;
            })}
          </Row>
        </CustomContainer>
      </CustomSection>
    </div>
  );
};

export default BlogsScreen;

import CustomButton from "@/components/ui/custom_button/custom_button";
import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./blogs.module.scss";
import Link from "next/link";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import PageHead from "@/components/ui/page_head/page_head";

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
  return (
    <div>
      <PageHead
        head="BLOGS"
        img="/images/png/blog.PNG"
        rightImg="/images/png/blog.PNG"
        variant={3}
      />
      <br />
      <br />
      <br />
      <CustomContainer>
        <Row>
          {blogs.map((b) => {
            return <BlogCard key={b.id} data={b} />;
          })}
        </Row>
      </CustomContainer>
    </div>
  );
};

export default BlogsScreen;

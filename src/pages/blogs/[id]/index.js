import BlogScreen from "@/components/screens/blogs/blog/blogs";
import ServicePostScreen from "@/components/screens/services/service/service_post/service_post";
import { getData } from "@/libs/firebase/firebase";
import React from "react";

const BlogPage = ({ blog }) => {
  return <BlogScreen blog={blog}/>;
};

export default BlogPage;

export async function getServerSideProps(context) {
  try {
    const blog = await getData("blog_post", ["id", "==", context.query.id]);
    return { props: { blog: blog[0] || {} } };
  } catch (err) {
    return { props: { blog: {} } };
  }
}

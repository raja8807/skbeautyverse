import BlogScreen from "@/components/screens/blogs/blog/blogs";
import { getData } from "@/libs/firebase/firebase";
import Head from "next/head";
import React from "react";

const BlogPage = ({ blog }) => {
  return (
    <>
     <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.description} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:image" content={blog?.rows?.[0]?.img} />
        <meta property="og:url" content={`https://www.skbeautyverse.com/blogs/${blog.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.description} />
        <meta name="twitter:image" content={blog?.rows?.[0]?.img} />
      </Head>
      <BlogScreen blog={blog} />
    </>
  );
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

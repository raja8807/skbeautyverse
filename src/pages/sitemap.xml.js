//pages/sitemap.xml.js

import { getAllData } from "@/libs/firebase/firebase";

function generateSiteMap(blogs = [], service = []) {

  

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://www.skbeautyverse.com</loc>
     </url>
     <url>
       <loc>https://www.skbeautyverse.com/contact</loc>
     </url>
     <url>
       <loc>https://www.skbeautyverse.com/blogs</loc>
     </url>
     <url>
       <loc>https://www.skbeautyverse.com/about</loc>
     </url>
 
     ${blogs
       .map(({ id }) => {
         return `
       <url>
           <loc>${`https://www.skbeautyverse.com/blogs/${id}`}</loc>
       </url>
     `;
       })
       .join("")}
     ${service
       .map(({ id, service }) => {
         return `
       <url>
           <loc>${`https://www.skbeautyverse.com/services/${service}/${id}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const blogs = await getAllData("blog_post");
  const service = await getAllData("service_post");

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(blogs, service);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

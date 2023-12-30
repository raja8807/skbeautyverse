// InstagramEmbed.js
import React, { useEffect } from "react";
import axios from "axios";

const InstagramEmbed = ({ url }) => {
  useEffect(() => {
    // Fetch Instagram Embed HTML using the Instagram Embed API
    const fetchInstagramEmbed = async () => {
      try {
        const response = await axios.get(
          `https://api.instagram.com/oembed/?url=${encodeURIComponent(url)}`
        );
        const embedHtml = response.data.html;

        // Inject the embed HTML into the component
        document.getElementById("instagramEmbedContainer").innerHTML =
          embedHtml;
      } catch (error) {
        console.error("Error fetching Instagram embed:", error);
      }
    };

    fetchInstagramEmbed();
  }, [url]);

  return <div id="instagramEmbedContainer"></div>;
};

export default InstagramEmbed;

import React from "react";
import styles from "./social_media_bar.module.scss";
import SocialLinks from "@/components/ui/social_links/social_links";
import { Facebook, Instagram, Whatsapp, Youtube } from "react-bootstrap-icons";
import Link from "next/link";

const SocialMediaBar = () => {
  const socialMedias = [
    {
      id: "insta",
      href: "https://www.instagram.com/skbeautyverse",
      icon: <Instagram />,
      color: "#FD1D1D",
    },
    {
      id: "fb",
      href: "/",
      icon: <Facebook />,
      color: "#3b5998",
    },
    {
      id: "yt",
      href: "https://youtube.com/@skbeauty-verse",
      icon: <Youtube />,
      color: "#FF0000",
    },
    {
      id: "wa",
      href: "https://wa.me/918610345830?text=Hi, I want more details..",
      icon: <Whatsapp />,
      color: "#25D366",
    },
  ];

  return (
    <div className={styles.SocialMediaBar}>
      {socialMedias.map((sm) => {
        return (
          <Link href={sm.href} key={sm.id} target="_blank">
            <div
              style={{
                backgroundColor: sm.color,
              }}
            >
              {sm.icon}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SocialMediaBar;

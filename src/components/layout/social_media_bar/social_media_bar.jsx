import React from "react";
import styles from "./social_media_bar.module.scss";
import SocialLinks from "@/components/ui/social_links/social_links";
import { Facebook, Instagram, Whatsapp, Youtube } from "react-bootstrap-icons";
import Link from "next/link";

const SocialMediaBar = () => {
  const socialMedias = [
    {
      id: "insta",
      href: "/",
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
      href: "/",
      icon: <Youtube />,
      color: "#FF0000",
    },
    {
      id: "wa",
      href: "/",
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

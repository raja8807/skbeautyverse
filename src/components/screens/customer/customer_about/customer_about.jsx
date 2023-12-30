import { useState } from "react";
import styles from "./customer_about.module.scss";
import EditAbout from "./about/about";
import CustomerGallery from "./customer_gallery/customer_gallery";
import { InstagramEmbed } from "react-social-media-embed";
// import InstagramEmbed from "@/components/instagramEmbed/instagramEmbed";
const CustomerAbout = ({ user, updateCustomer, readOnly, images }) => {

  const tabs = [
    {
      title: "About",
      component: (
        <>
          <EditAbout
            user={user}
            updateCustomer={updateCustomer}
            readOnly={readOnly}
          />
          {user.instaUrl && (
            <iframe
              src={`${user.instaUrl}/embed`}
              style={{
                width: "100%",
                margin: "50px 0",
                height: "600px",
                overflow: "auto",
                borderRadius: "12px",
              }}
              frameborder="0"
              scrolling="no"
              allowtransparency="true"
            ></iframe>
          )}
        </>
      ),
    },
    {
      title: "Gallery",
      component: (
        <CustomerGallery profile={user} images={images} readOnly={readOnly} />
      ),
    },
  ];

  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <div className={styles.customerAbout}>
      <br />
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab.title}
            onClick={() => {
              setCurrentTab(tab);
            }}
            className={`${styles.tab} ${
              tab.title === currentTab.title && styles.active
            }`}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <br />
      <div>{currentTab.component}</div>
      <br />
      <br />
    </div>
  );
};

export default CustomerAbout;

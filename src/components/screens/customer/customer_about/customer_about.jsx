import { useState } from "react";
import styles from "./customer_about.module.scss";
import EditAbout from "./about/about";
import CustomerGallery from "./customer_gallery/customer_gallery";
const CustomerAbout = ({ user, updateCustomer, readOnly,images }) => {
  const tabs = [
    {
      title: "About",
      component: (
        <EditAbout
          user={user}
          updateCustomer={updateCustomer}
          readOnly={readOnly}
        />
      ),
    },
    {
      title: "Gallery",
      component: <CustomerGallery profile={user} images={images} readOnly={readOnly}/>,
    },
  ];

  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <div className={styles.customerAbout}>
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
    </div>
  );
};

export default CustomerAbout;

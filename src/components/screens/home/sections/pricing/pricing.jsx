import CustomContainer from "@/components/ui/custom_container/custom_container";
import styles from "./pricing.module.scss";
import Package from "./package/package";
import { useState } from "react";
import EnquirePopup from "@/components/enquire_popup/enquire_popup";

const {
  default: CustomSection,
} = require("@/components/ui/custom_section/custom_section");

const Pricing = (props) => {
  const { packages } = props;

  const tempPackages = [
    {
      head: "BEAUTY-WORLD",
      price: "5,999",
      body: [
        "BASIC MAKEUP",
        "BASIC HAIRSTYLES",
        "1 SAREE DRAPPING",
        "MAKEUP FOR GROOM",
        "SINGLE SESSION",
      ],
    },
    {
      head: "BEAUTY-VERSE",
      price: "19,999",
      body: [
        "UHD MAKEUP",
        "SWEAT PROOF",
        "WATER PROOF",
        "ADVANCE HAIRSTYLES",
        "SAREE DRAPPING",
        "MEHANDHI",
        "MAKEUP FOR GROOM",
        "JEWELS FOR 2 SESSION",
        "MAKEUP FOR SIBLING",
        "GUEST MAKEUP",
      ],
    },
    {
      head: "BEAUTY-PLANET",
      price: "11,999",
      body: [
        "HD MAKEUP",
        "HAIRSTYLES",
        "JEWELS",
        "2 SESSION",
        "SAREE DRAPPING",
        "MAKEUP FOR GROOM",
      ],
    },
  ];

  const [showPopup,setShowPopup]=useState('')

  return (
    <CustomSection
      bg="white"
      head="Packages"
      caption="Book a Complete Engagement, Marriage, Reception Makeup With Us"
    >
      <EnquirePopup show={!!showPopup} setShow={setShowPopup} initialMessage={showPopup}/>
      <CustomContainer>
        <div className={styles.packWrap}>
          {packages
            ? packages.map((p, i) => {
                return (
                  <Package
                    key={p.head}
                    price={p.price}
                    head={p.head}
                    body={p.body}
                    idx={i}
                    setShowPopup={setShowPopup}
                  />
                );
              })
            : tempPackages.map((p, i) => {
                return (
                  <Package
                    key={p.head}
                    price={p.price}
                    head={p.head}
                    body={p.body}
                    idx={i}
                    setShowPopup={setShowPopup}
                  />
                );
              })}
        </div>
      </CustomContainer>
    </CustomSection>
  );
};

export default Pricing;

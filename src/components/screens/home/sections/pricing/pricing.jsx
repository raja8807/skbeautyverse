import CustomContainer from "@/components/ui/custom_container/custom_container";
import styles from "./pricing.module.scss";
import { Col, Row } from "react-bootstrap";
import Package from "./package/package";

const {
  default: CustomSection,
} = require("@/components/ui/custom_section/custom_section");

const Pricing = () => {
  const packages = [
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

  return (
    <CustomSection
      bg="white"
      head="Packages"
      caption="Book a Complete Engagement, Marriage, Reception Makeup With Us"
    >
      <CustomContainer>
        <div className={styles.packWrap}>
          {packages.map((p, i) => {
            return (
              <Package
                key={p.head}
                price={p.price}
                head={p.head}
                body={p.body}
                idx={i}
              />
            );
          })}
        </div>
      </CustomContainer>
    </CustomSection>
  );
};

export default Pricing;
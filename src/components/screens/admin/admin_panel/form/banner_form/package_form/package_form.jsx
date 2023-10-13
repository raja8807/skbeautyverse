import CustomSection from "@/components/ui/custom_section/custom_section";
import { Col, Row } from "react-bootstrap";
import styles from "./package_form.module.scss";
import { PlusCircle, Trash, TrashFill, XCircle } from "react-bootstrap-icons";
import CustomButton from "@/components/ui/custom_button/custom_button";

const { useState } = require("react");

const PackageForm = () => {
  const [packages, setPackages] = useState([
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
  ]);

  const setPackValue = (index, key, value) => {
    setPackages((prev) => {
      const prevPaks = [...prev];
      prevPaks[index][key] = value;
      return prevPaks;
    });
  };

  return (
    <CustomSection head="Update Package">
      <Row>
        {packages.map((pack, pi) => {
          return (
            <Col key={pi} xs={12} md={4}>
              <div className={styles.form}>
                <section>
                  <p>Package {pi + 1}</p>
                  <XCircle
                    onClick={() => {
                      setPackages((prev) => {
                        return prev.filter((f, fid) => {
                          return fid !== pi;
                        });
                      });
                    }}
                  />
                </section>
                <div className={styles.field}>
                  <small>Heading</small>
                  <input
                    placeholder="Heading"
                    value={pack.head}
                    onChange={(e) => {
                      const { value } = e.target;
                      setPackValue(pi, "head", value);
                    }}
                  />
                </div>

                {pack.body.map((feat, fi) => {
                  return (
                    <div key={fi}>
                      <small>Feature {fi + 1}</small>
                      <input
                        value={feat}
                        placeholder="Feature"
                        onChange={(e) => {
                          const { value } = e.target;
                          const body = [...pack.body];
                          body[fi] = value;
                          setPackValue(pi, "body", body);
                        }}
                      />
                      <TrashFill
                        onClick={() => {
                          const newBody = pack.body.filter(
                            (s, idx) => idx !== fi
                          );
                          setPackValue(pi, "body", newBody);
                        }}
                      />
                    </div>
                  );
                })}

                {!pack.body.some((b) => !b) && (
                  <PlusCircle
                    className={styles.add}
                    onClick={() => {
                      const newBody = [...pack.body, ""];
                      setPackValue(pi, "body", newBody);
                    }}
                  />
                )}

                <div>
                  <small>Price</small>
                  <input
                    placeholder="Price"
                    value={pack.price}
                    onChange={(e) => {
                      const { value } = e.target;
                      setPackValue(pi, "price", value);
                    }}
                  />
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <CustomButton
        clickHandler={() => {
          setPackages((prev) => [...prev, { head: "", body: [""], price: "" }]);
        }}
      >
        Add Package
      </CustomButton>
      <br />
      <br />
      <CustomButton
        clickHandler={() => {
          //   setPackages((prev) => [...prev, { head: "", body: [""], price: "" }]);
        }}
        type="gold"
      >
        Save
      </CustomButton>
    </CustomSection>
  );
};

export default PackageForm;

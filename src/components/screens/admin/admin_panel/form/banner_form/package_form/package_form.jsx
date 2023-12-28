import CustomSection from "@/components/ui/custom_section/custom_section";
import { Col, Row, Spinner } from "react-bootstrap";
import styles from "./package_form.module.scss";
import { PlusCircle, Trash, TrashFill, XCircle } from "react-bootstrap-icons";
import CustomButton from "@/components/ui/custom_button/custom_button";

const { useState } = require("react");

const PackageForm = ({ packages: packagesData }) => {
  const [packages, setPackages] = useState(packagesData || []);

  const setPackValue = (index, key, value) => {
    setPackages((prev) => {
      const prevPaks = [...prev];
      prevPaks[index][key] = value;
      return prevPaks;
    });
  };

  const [loadingIdx, setLoadingIdx] = useState(null);

  const savePackage = async (pack, index) => {
    setLoadingIdx(index);
    try {
      const res = await fetch("/api/package", {
        method: "PUT",
        body: JSON.stringify(pack),
      });
      const dataa = await res.json();
      setLoadingIdx(null);
    } catch (err) {
      console.log(err);
    }
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
                <br />
                <CustomButton
                  clickHandler={async () => {
                    await savePackage(pack, pi);
                  }}
                  type="gold"
                  disabled={loadingIdx !== null}
                >
                  {loadingIdx === pi ? <Spinner /> : "Save"}
                </CustomButton>
              </div>
            </Col>
          );
        })}
      </Row>
    </CustomSection>
  );
};

export default PackageForm;

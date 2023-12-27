import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GeoAlt, Search, Telephone } from "react-bootstrap-icons";
import styles from "./search.module.scss";
import { Col, Image, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");
let country_state_district = require("@coffeebeanslabs/country_state_district");

const SearchScreen = ({ profiles }) => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(router.query.q);
  console.log(searchTerm);
  const [profilesData, setProfilesData] = useState(profiles || []);

  useEffect(() => {
    setProfilesData(() => {
      const fil = profiles.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return fil;
    });
  }, [searchTerm]);
  let districts = country_state_district.getDistrictsByStateId(32);

  return (
    <CustomContainer>
      <br />
      <div className={styles.top}>
        <div className={styles.search}>
          <input
            type="search"
            value={searchTerm}
            placeholder="Search here.."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                router.replace(`/search?q=${searchTerm}`);
              }
            }}
          />
          <Search />
        </div>
        <select
          onChange={(e) => {
            const { value } = e.target;
            setSearchTerm(value);
          }}
          className={styles.select}
        >
          <option value="">Search by location</option>
          {districts.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
      <br />
      <Row>
        {profilesData.map((p) => (
          <Col key={p._id} xs={6} md={4}>
            <div className={styles.profile}>
              <div className={styles.top}>
                <Image
                  src={p.imageUrl}
                  width={50}
                  height={50}
                  alt={p.userName}
                />
                <p>{p.name}</p>
              </div>
              <div className={styles.bottom}>
                <div className={styles.row}>
                  <GeoAlt />
                  <p>{p.location}</p>
                </div>
                <div className={styles.row}>
                  <Telephone />
                  <p>{p.phoneNumber}</p>
                </div>
                <CustomButton
                  type="black2"
                  clickHandler={() => {
                    router.replace(`/profile/${p.userName}`);
                  }}
                >
                  View Profile
                </CustomButton>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </CustomContainer>
  );
};

export default SearchScreen;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Bag,
  Briefcase,
  GeoAlt,
  Search,
  Telephone,
} from "react-bootstrap-icons";
import styles from "./search.module.scss";
import { Col, Image, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");
let country_state_district = require("@coffeebeanslabs/country_state_district");

const SearchScreen = ({ profiles = [] }) => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(router.query.q || "");
  const [profilesData, setProfilesData] = useState(profiles || []);
  const [location, setLocation] = useState(null);
  const [profession, setProfession] = useState(router.query.p || null);
  const [designation, setDesignation] = useState(null);

  const professions = ["Makeup Artist", "Photographer"];

  const session = useSession();
  // console.log(session);

  useEffect(() => {
    if (profiles[0]) {
      setProfilesData(() => {
        let pros = [...profiles];

        if (!session.data) {
          pros = profiles.filter((p) => {
            return p.profession !== "Student" && p.isActive && p.isApproved;
          });
        }

        if (location) {
          pros = pros.filter((p) => {
            if (p.location) {
              return p.location === location;
            }
            return false;
          });
        }

        if (profession) {
          pros = pros.filter((p) => {
            if (p.profession) {
              return p.profession === profession;
            }
            return false;
          });
        }
        if (designation) {
          pros = pros.filter((p) => {
            if (p.desgnations) {
              return p.desgnations.includes(designation);
            }
            return false;
          });
        }

        const fil = pros.filter((p) => {
          if (p.name && p.userName) {
            return (
              p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              p.userName.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
        });

        return fil;
      });
    }
  }, [profiles, searchTerm, location, profession, designation]);

  let districts = country_state_district.getDistrictsByStateId(32);

  return (
    <CustomContainer className={styles.cont}>
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
          value={location}
          onChange={(e) => {
            const { value } = e.target;
            setLocation(value);
          }}
          className={styles.select}
        >
          <option value="">All Locations</option>
          {districts.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
        <select
          value={profession}
          onChange={(e) => {
            const { value } = e.target;
            setDesignation(null);
            setProfession(value);
          }}
          className={styles.select}
        >
          <option value="">All Profession</option>
          {professions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {/* <select
          value={designation}
          disabled={!profession}
          onChange={(e) => {
            const { value } = e.target;
            setDesignation(value);
          }}
          className={styles.select}
        >
          <option value=""
          onChange={(e)=>{
            setDesignation(e.target.value)
          }}
          >All Designation</option>
          {desgnations[profession] &&
            desgnations[profession].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
        </select> */}
      </div>
      <br />
      <Row>
        {profilesData.map((p) => (
          <Col key={p._id} xs={12} md={6} lg={4}>
            <div className={styles.profile}>
              <div className={styles.top}>
                <Image
                  src={p.imageUrl || "/images/user.jpg"}
                  width={50}
                  height={50}
                  alt={p.userName}
                />
                <p>
                  <span
                    className={`${styles.bubble} ${
                      p.isActive && styles.active
                    }`}
                  />
                  {p.name}
                </p>
                -<small>{p.userName}</small>
              </div>
              <div className={styles.bottom}>
                <div className={styles.row}>
                  <GeoAlt />
                  <p>{p.location}</p>
                </div>
                <div className={styles.row}>
                  <Telephone />
                  <Link href={`tel:${p.phoneNumber}`}>
                    <p style={{ textDecoration: "underLine" }}>
                      {p.phoneNumber}
                    </p>
                  </Link>
                </div>
                {p.profession && (
                  <div className={styles.row}>
                    <Briefcase />
                    <p>{p.profession} </p>
                  </div>
                )}
                {p.designations && p.designations[0] && (
                  <ul className={styles.desRow}>
                    {p.designations.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
                {session.data && (
                  <CustomButton
                    type="black2"
                    clickHandler={async () => {
                      const res = await axios.post("/api/customer/approval", {
                        ...p,
                        isApproved: p.isApproved ? false : true,
                      });
                      console.log(res);
                    }}
                  >
                    {p.isApproved ? "Disapprove" : "Approve"}
                  </CustomButton>
                )}
                <CustomButton type="black2">
                  <Link href={`/profile/${p.userName}`} target="_blank">
                    View Profile
                  </Link>
                </CustomButton>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      {profilesData && profilesData.length === 0 && (
        <p
          style={{
            margin: "50px 0",
            textAlign: "center",
          }}
        >
          No profiles found
        </p>
      )}
    </CustomContainer>
  );
};

export default SearchScreen;

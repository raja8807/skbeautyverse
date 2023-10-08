import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Image } from "react-bootstrap";
import styles from './x.module.scss'

const AboutPage = () => {
  function getRandomSize(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  const x = [];

  for (var i = 0; i < 25; i++) {
    var width = getRandomSize(200, 400);
    var height = getRandomSize(200, 400);
    const img = "https://placekitten.com/" + width + "/" + height;

    x.push(img);
  }

  return (
    <CustomContainer>
      <div className={styles.x}>
        {x.map((src, i) => (
          <Image key={i} src={src} alt="a" fluid />
        ))}
      </div>
    </CustomContainer>
  );
};

export default AboutPage;

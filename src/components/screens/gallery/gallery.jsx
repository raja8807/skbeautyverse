import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Col, Image, Row } from "react-bootstrap";
import styles from "./gallery.module.scss";
import FullViewImage from "./full_view/full_view";
import { useState } from "react";
import CustomSection from "@/components/ui/custom_section/custom_section";
import { Eye } from "react-bootstrap-icons";
import CustomSelect from "@/components/ui/custom_select/custom_select";
import categories from "@/components/constants/categories";
import { useRouter } from "next/router";
import Products from "./products/products";

const GalleryScreen = (props) => {
  const { images = [] } = props;
  const router = useRouter();

  const [currentFullViewImageIndex, SetCurrentFullViewImageIndex] =
    useState(null);

  const allCategories = [
    ...categories.map((c) => ({ text: c.name, value: c.id })),
  ];

  const [selectedCategory, setSelectedCategory] = useState(
    router?.query?.category || allCategories[0].text
  );

  console.log(selectedCategory);

  const skinData = {
    hair: [
      {
        id: "Haircut",
        data: "A haircut transforms more than strands; it shapes identity, expressing individuality or embracing change. From classic styles to bold trends, each snip narrates a personal story. In the barber's chair, the mundane becomes a canvas for self-expression, a tangible metamorphosis in 40 minutes.",
      },
      {
        id: "Hairwash",
        data: "Revitalize your locks with a refreshing hair wash. Gently cleanse away impurities, leaving your hair silky and nourished. Choose a sulfate-free shampoo suited to your hair type, massage in circular motions, and enjoy the invigorating sensation of a clean, healthy mane.",
      },
      {
        id: "Hair spa",
        data: "Indulge in the ultimate hair rejuvenation with a luxurious hair spa. Treat your tresses to a nourishing blend of deep conditioning, massage, and specialized treatments, leaving your hair silky, vibrant, and revitalized. Experience the epitome of relaxation while enhancing your hair's health and beauty.",
      },
      {
        id: "Anti dandruff treatment",
        data: "Combat dandruff with effective treatments like medicated shampoos containing ingredients like ketoconazole or coal tar. Regular use, proper scalp hygiene, and avoiding harsh products contribute to a flake-free, healthy scalp, providing relief from persistent dandruff issues.",
      },
      {
        id: "Anti hairfall treatment",
        data: "Combat hair fall with effective treatments that strengthen roots and promote hair growth. Utilize nourishing shampoos, conditioners, and serums enriched with vitamins and minerals. Consult professionals for personalized solutions, addressing underlying causes for a healthier, fuller mane.",
      },
      {
        id: "Highlights",
        data: "Hair highlights add depth and dimension to your hair by lightening specific sections. Whether subtle or bold, highlights enhance natural beauty, create texture, and provide a sun-kissed effect. From classic to trendy, they offer a versatile way to elevate your hairstyle.",
      },
      {
        id: "Hair color treatments",
        data: "Hair color treatments involve applying pigments to change or enhance hair color. Options include permanent, semi-permanent, and temporary dyes. Techniques like highlights, balayage, and ombre offer versatile looks. Professional salons and at-home kits cater to diverse preferences, allowing individuals to express their style through vibrant or subtle transformations.",
      },
      {
        id: "Straightening treatment",
        data: "Straightening treatments transform curly or wavy hair into sleek, straight locks. Utilizing various methods such as keratin treatments or chemical relaxers, these procedures enhance manageability and reduce frizz, offering a long-lasting solution for those seeking smooth and straight hair.",
      },
      {
        id: "Smoothing treatment",
        data: "Smoothing treatments are hair care procedures designed to reduce frizz and enhance manageability. Typically using keratin or other smoothing agents, these treatments create sleek, shiny hair, providing lasting results for those seeking a polished and effortlessly styled look.",
      },
      {
        id: "Keratin treatment",
        data: "Keratin treatment is a hair-smoothing procedure that reduces frizz and enhances shine. It involves applying a keratin-infused formula to the hair, followed by heat styling. The result is smoother, more manageable hair with a sleek finish that lasts for weeks.",
      },
    ],
    skin: [
      {
        id: "Waxing",
        data: "Waxing is a hair removal method where warm wax adheres to hair, and when removed, pulls hair from the root. It results in smooth skin, lasts longer than shaving, and often reduces hair regrowth. Commonly used for legs, underarms areas.",
      },
      {
        id: "Manicure",
        data: "Manicure enhances nails' health and appearance, involving shaping, cuticle care, and polish application. A relaxing beauty ritual, it promotes self-care and confidence. Skilled technicians pamper hands, leaving nails impeccably groomed and stylishly polished for a polished and chic finish.",
      },
      {
        id: "Pedicure",
        data: "A pedicure is a rejuvenating foot treatment that involves soaking, exfoliating, and moisturizing the feet. Nail shaping, cuticle care, and a relaxing massage enhance the experience. This pampering ritual leaves feet looking and feeling refreshed, promoting overall well-being.",
      },
      {
        id: "Cleanup",
        data: "Skin cleanup involves removing impurities, dead cells, and excess oil from the skin's surface. This process, often performed through exfoliation and cleansing, promotes a clearer complexion, unclogs pores, and enhances the skin's natural radiance for a healthier and more vibrant appearance.",
      },
      {
        id: "Facial",
        data: "Facial treatments rejuvenate and nourish the skin, addressing concerns like acne, aging, and dryness. Through cleansing, exfoliation, and moisturizing, facials enhance skin texture and promote a radiant complexion. Professional skincare experts tailor treatments to individual needs for optimal results and relaxation.",
      },
      {
        id: "Skin detoxification treatment",
        data: "Skin detoxification treatments involve purifying the skin by eliminating impurities, toxins, and pollutants. These rejuvenating procedures, often incorporating masks, exfoliation, and soothing agents, aim to promote a healthier complexion, leaving skin refreshed and revitalized.",
      },
      {
        id: "Anti aging treatment",
        data: "Anti-aging treatments aim to rejuvenate and enhance skin appearance, reducing wrinkles and promoting collagen production. Options include topical creams, laser therapy, and injectables like Botox. Consult with a dermatologist for personalized approaches to maintain youthful skin.",
      },
      {
        id: "Anti acne treatment",
        data: "Effective anti-acne treatments target blemishes, reduce inflammation, and prevent future breakouts. Ingredients like salicylic acid and benzoyl peroxide cleanse pores, while retinoids promote skin renewal. Consistent use and a gentle skincare routine contribute to clearer, healthier skin.",
      },
      {
        id: "De tan treatment",
        data: "De-tan treatment is a skincare procedure designed to reduce or remove sun-induced tanning. Using exfoliation, masks, and specialized products, it aims to lighten skin tone and restore a natural complexion. This treatment is popular for rejuvenating and brightening the skin.",
      },
      {
        id: "Advance Facial",
        data: "Advance Facial treatments use cutting-edge technologies and high-performance skincare products to address specific skin concerns. These innovative procedures often incorporate techniques like microcurrents, LED therapy, and advanced ingredients, delivering enhanced results for rejuvenated, radiant skin.",
      },
      // {
      //   id: "OTHER",
      //   data: "",
      // },
    ],
  };

  // console.log(images);

  return (
    <>
      <CustomContainer>
        <br />
        <CustomSection head="Our Gallery" noPadding />
        <CustomSelect
          value={selectedCategory}
          options={allCategories}
          onChange={(v) => {
            router.push(`/gallery/${v}`);
            setSelectedCategory(v);
          }}
        />
        <br />
        <br />
        {/* {selectedCategory === "skin" ||
          (selectedCategory === "hair" && (
           
          ))} */}
        {(selectedCategory === "skin" || selectedCategory === "hair") && (
          <>
            <Row>
              {skinData[selectedCategory].map((data) => (
                <Col key={data.data} xs={12} md={6} className={styles.col}>
                  <Row>
                    <Col>
                      <Image
                        src={`/images/gallery/${selectedCategory}/${data.id}.jpg`}
                        fluid
                        alt="img"
                      />
                    </Col>
                    <Col>
                      <h3>{data.id.toUpperCase()}</h3>
                      <p>{data.data}</p>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
            <br />
            <br />
          </>
        )}
        {selectedCategory !== "products" ? (
          <div className={styles.wrapper}>
            {images
              ?.sort((a, b) => {
                return a.index - b.index;
              })
              ?.map((img, i) => (
                <div key={i} className={styles.img_holder}>
                  <div
                    onClick={() => {
                      SetCurrentFullViewImageIndex(i);
                    }}
                  >
                    <Eye />
                  </div>
                  <Image
                    src={img.url.replace("upload", "upload/w_400,f_auto")}
                    alt="a"
                    fluid
                  />
                </div>
              ))}
          </div>
        ) : (
          <Products
            images={images}
            SetCurrentFullViewImageIndex={SetCurrentFullViewImageIndex}
          />
        )}
      </CustomContainer>
      {currentFullViewImageIndex !== null && (
        <FullViewImage
          currentFullViewImageIndex={currentFullViewImageIndex}
          SetCurrentFullViewImageIndex={SetCurrentFullViewImageIndex}
          allImages={images}
        />
      )}
    </>
  );
};

export default GalleryScreen;

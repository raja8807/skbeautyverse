// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import GalleryImage from "@/components/models/GalleryImageModal";
import { connectMongoDB } from "@/libs/mongoConnect";
// import Test from "@/components/models/ChatModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { q } = req.query;
    try {
      await connectMongoDB();
      const newImages = JSON.parse(req.body);
      await GalleryImage.deleteMany({ category: q });
      await GalleryImage.insertMany(
        newImages.map((i) => ({
          index: i.index,
          url: i.url,
          category: i.category,
          subCategory: i.subCategory,
        }))
      );
      res.status(200).send(newImages);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ err: err.message });
    }
  }
  if (req.method === "GET") {
    const { q } = req.query;
    try {
      await connectMongoDB();
      // const x = await GalleryImage.updateMany(
      //   { category: "products" },
      //   { $set: { subCategory: "Jewels" } }
      // );
      const newImages = await GalleryImage.find({ category: q });
      res.status(200).send(newImages);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ err: err.message });
    }
  }
}

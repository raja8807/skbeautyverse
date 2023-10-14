// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import BannerImage from "@/components/models/BannerImageModal";
// import Package from "@/components/models/PackageModel";
import { connectMongoDB } from "@/libs/mongoConnect";
// import Test from "@/components/models/ChatModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectMongoDB();
      const newImages = JSON.parse(req.body);
      await BannerImage.deleteMany({});
      await BannerImage.insertMany(
        newImages.map((i) => ({ index: i.index, url: i.url }))
      );
      res.status(200).send(newImages);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ err: err.message });
    }
  }
}

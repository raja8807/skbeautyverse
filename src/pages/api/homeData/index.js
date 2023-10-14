// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import BannerImage from "@/components/models/BannerImageModal";
import Package from "@/components/models/PackageModel";
import { connectMongoDB } from "@/libs/mongoConnect";
// import Test from "@/components/models/ChatModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongoDB();
      const packages = await Package.find();
      const bannerImages = await BannerImage.find()
      // console.log(res);
      res.status(200).send({
        bannerImages,
        packages,
      });
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  }
}

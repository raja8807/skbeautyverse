// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import BannerImage from "@/components/models/BannerImageModal";
import Package from "@/components/models/PackageModel";
import ReviewModal from "@/components/models/ReviewModal";
import { connectMongoDB } from "@/libs/mongoConnect";
// import Test from "@/components/models/ChatModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongoDB();
      const packages = await Package.find();
      const bannerImages = await BannerImage.find()
      // await ReviewModal
      const reviews = await ReviewModal.find().limit(4)
      res.status(200).send({
        bannerImages,
        packages,
        reviews
      });
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  }
}

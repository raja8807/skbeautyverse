// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import BannerImage from "@/components/models/BannerImageModal";
import Customer from "@/components/models/CustomerModal";
import GalleryImage from "@/components/models/GalleryImageModal";
import Package from "@/components/models/PackageModel";
import ReviewModal from "@/components/models/ReviewModal";
import { connectMongoDB } from "@/libs/mongoConnect";
// import Test from "@/components/models/ChatModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongoDB();
      const reviews = await ReviewModal.find().limit(4);
      const galleryImages = await GalleryImage.find({
        category: "bridal",
      }).limit(12);

      res.status(200).send({
        reviews,
        galleryImages,
      });
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  }
}

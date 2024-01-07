// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import BannerImage from "@/components/models/BannerImageModal";
import Customer from "@/components/models/CustomerModal";
import Package from "@/components/models/PackageModel";
import ReviewModal from "@/components/models/ReviewModal";
import { connectMongoDB } from "@/libs/mongoConnect";
// import Test from "@/components/models/ChatModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongoDB();
      const packages = await Package.find();
      const bannerImages = await BannerImage.find();
      const reviews = await ReviewModal.find().limit(4);
      const profiles = await Customer.find({
        isActive: true,
        isApproved: true,
      });
      let profileData = [];
      const professions = ["Makeup Artist", "Photographer", "Student"];

      if (profiles) {
        profileData = professions.map((pro) => {
          const data = profiles.filter((pr) => pr.profession === pro);
          return {
            profession: pro,
            count: data.length,
          };
        });
      }
      res.status(200).send({
        bannerImages,
        packages,
        reviews,
        profileData,
      });
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  }
}

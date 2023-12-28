// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import GalleryImage from "@/components/models/GalleryImageModal";
import Customer from "@/components/models/CustomerModal";
import MuaImage from "@/components/models/MuaImageModal";
import { connectMongoDB } from "@/libs/mongoConnect";

// import Test from "@/components/models/ChatModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongoDB();
      const user = await Customer.findOne({ userName: req.query.userName });
      const images = await MuaImage.find({ userName: req.query.userName });
      res.status(200).send({ user, images });
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import GalleryImage from "@/components/models/GalleryImageModal";
import Customer from "@/components/models/CustomerModal";
import { connectMongoDB } from "@/libs/mongoConnect";

// import Test from "@/components/models/ChatModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongoDB();
      const user = await Customer.findOne({ userName: req.query.user });
      res.status(200).send(!!user);
    } catch (err) {
      console.log(err);
      res.status(500).send({ err: err.message });
    }
  }
}

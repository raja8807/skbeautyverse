// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import GalleryImage from "@/components/models/GalleryImageModal";
import Customer from "@/components/models/CustomerModal";
import { connectMongoDB } from "@/libs/mongoConnect";
// import Test from "@/components/models/ChatModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectMongoDB();
      const newCustomer = await Customer.create(req.body);
      res.status(200).send(newCustomer);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ err: err.message });
    }
  }
  //   if (req.method === "GET") {
  //     const { q } = req.query;
  //     try {
  //       await connectMongoDB();
  //       const newImages = await GalleryImage.find({ category: q });
  //       res.status(200).send(newImages);
  //     } catch (err) {
  //       console.log(err.message);
  //       res.status(500).send({ err: err.message });
  //     }
  //   }
}

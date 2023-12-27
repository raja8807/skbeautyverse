// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import Package from "@/components/models/PackageModel";
import MuaImage from "@/components/models/MuaImageModal";
import { connectMongoDB } from "@/libs/mongoConnect";
// import Test from "@/components/models/ChatModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongoDB();
      const images = MuaImage.find({ userName: req.query.userName });
      res.status(200).send(images);
    } catch (err) {
      console.log(err);
      res.status(500).send({ err: err.message });
    }
  }
  if (req.method === "POST") {
    try {
      await connectMongoDB();
      const newImage = MuaImage.create(req.body);
      res.status(200).send(newImage);
    } catch (err) {
      console.log(err);
      res.status(500).send({ err: err.message });
    }
  }
}
//

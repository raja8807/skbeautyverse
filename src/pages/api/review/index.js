// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import GalleryImage from "@/components/models/GalleryImageModal";
import ReviewModal from "@/components/models/ReviewModal";
import { connectMongoDB } from "@/libs/mongoConnect";
// import Test from "@/components/models/ChatModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectMongoDB();
      const newReview = await ReviewModal.create(JSON.parse(req.body));
      res.status(200).send(newReview);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ err: err.message });
    }
  }
  if (req.method === "GET") {
    const { q } = req.query;
    try {
      await connectMongoDB();
      const reviews = await ReviewModal.find();
      res.status(200).send(reviews);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ err: err.message });
    }
  }
  if (req.method === "DELETE") {
    const { q } = req.query;
    try {
      await connectMongoDB();
      const reviews = await ReviewModal.deleteOne({_id:q});
      res.status(200).send(reviews);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ err: err.message });
    }
  }
}

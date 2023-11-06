// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Booking from "@/components/models/BookingModal";
import Package from "@/components/models/PackageModel";
import { connectMongoDB } from "@/libs/mongoConnect";
// import Test from "@/components/models/ChatModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectMongoDB();
      const newBooking = await Booking.create(req.body);
      res.status(200).send(newBooking);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ err: err.message });
    }
  }
  if (req.method === "GET") {
    try {
      await connectMongoDB();
      const allBooking = await Booking.find();
      const packages =await  Package.find();
      res.status(200).send({ bookings: allBooking, packages });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ err: err.message });
    }
  }
  if (req.method === "PUT") {
    try {
      await connectMongoDB();
      const x = { ...req.body };
      delete x._id;

      const allBooking = await Booking.updateOne({ _id: req.body._id }, x);
      res.status(200).send(req.body);
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

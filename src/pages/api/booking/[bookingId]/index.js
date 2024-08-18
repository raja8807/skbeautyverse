// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Booking from "@/components/models/BookingModal";
import Package from "@/components/models/PackageModel";
import ReviewModal from "@/components/models/ReviewModal";
import { connectMongoDB } from "@/libs/mongoConnect";
// import Test from "@/components/models/ChatModel";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { bookingId } = req.query;
    try {
      await connectMongoDB();
      const reviews = await Booking.deleteOne({ _id: bookingId });
      res.status(204).send(reviews);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ err: err.message });
    }
  }

  if (req.method === "GET") {
    try {
      await connectMongoDB();
      const booking = await Booking.findOne(req.query);
      res.status(200).send(booking);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ err: err.message });
    }
  }
}

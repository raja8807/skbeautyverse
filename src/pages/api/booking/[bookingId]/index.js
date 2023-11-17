// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Booking from "@/components/models/BookingModal";
import Package from "@/components/models/PackageModel";
import { connectMongoDB } from "@/libs/mongoConnect";
// import Test from "@/components/models/ChatModel";

export default async function handler(req, res) {

// console.log(req.query);

  if (req.method === "GET") {
    try {
      await connectMongoDB();
      const booking = await Booking.findOne(req.query);
    //   const packages =await  Package.find();
      res.status(200).send(booking);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ err: err.message });
    }
  }

}

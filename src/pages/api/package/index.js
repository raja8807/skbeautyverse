// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Package from "@/components/models/PackageModel";
import { connectMongoDB } from "@/libs/mongoConnect";
// import Test from "@/components/models/ChatModel";

export default async function handler(req, res) {
  // console.log(typeof req.body);
  if (req.method === "PUT") {
    try {
      await connectMongoDB();
      const newPackage = JSON.parse(req.body);
      await Package.findByIdAndUpdate(
        {
          _id: newPackage._id,
        },
        newPackage
      );
      res.status(200).send(newPackage);
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  }
}
//

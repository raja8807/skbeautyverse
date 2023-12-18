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
      console.log(err);
      res.status(500).send({ err: err });
    }
  }
  if (req.method === "PUT") {
    try {
      await connectMongoDB();
      const customers = (await Customer.find()) || [];
      const user = customers.find((c) => c.userName == req.body.userName);

      if (user) {
        if (user.customerId !== req.body.customerId) {
          res.status(403).send("already exist");
        }
      }

      const newCustomer = await Customer.updateOne(req.body);
      res.status(200).send(newCustomer);
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  }

  if (req.method === "GET") {
    try {
      await connectMongoDB();
      const user = await Customer.findOne({ userName: req.query.user });

      res.status(200).send(user);
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  }
}

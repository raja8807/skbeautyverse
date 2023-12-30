import Customer from "@/components/models/CustomerModal";
import { connectMongoDB } from "@/libs/mongoConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectMongoDB();
      const profiles = await Customer.find(
        !!req.body
          ? {}
          : {
              isActive: true,
              profession: {
                $not: {
                  $regex: "^Student*",
                },
              },
            }
      );
      res.status(200).send(profiles);
    } catch (err) {
      console.log(err);
      res.status(500).send({ err: err.message });
    }
  }
}

import Customer from "@/components/models/CustomerModal";
import MuaImage from "@/components/models/MuaImageModal";
import { connectMongoDB } from "@/libs/mongoConnect";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectMongoDB();
      const user = await Customer.findOne(
        !!req.body
          ? {}
          : {
              isActive: true,
              userName: req.query.userName,
              profession: {
                $not: {
                  $regex: "^Student*",
                },
              },
            }
      );
      let images = null;
      if (user) {
        images = await MuaImage.find({ userName: req.query.userName });
      }
      res.status(200).send({ user, images });
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  }
}

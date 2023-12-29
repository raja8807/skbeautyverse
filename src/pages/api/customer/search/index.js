// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import GalleryImage from "@/components/models/GalleryImageModal";
import Customer from "@/components/models/CustomerModal";
import MuaImage from "@/components/models/MuaImageModal";
import { connectMongoDB } from "@/libs/mongoConnect";

// import Test from "@/components/models/ChatModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongoDB();
      const profiles = await Customer.find(
        {
          profession : {
            $not : {
              $regex: "^Student*"
            }
          }
        }
      );
      res.status(200).send(profiles);
    } catch (err) {
      console.log(err);
      res.status(500).send({ err: err.message });
    }
  }
}

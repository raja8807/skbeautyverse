import { Schema, model, models } from "mongoose";

const testSchema = new Schema({
  index: {
    type: Number,
  },
  url: {
    type: String,
  },
},
{
    timestamps : true
});

const BannerImage = models.BannerImage || model("BannerImage", testSchema);

export default BannerImage;

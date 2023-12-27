import { Schema, model, models } from "mongoose";

const MuaImageSchema = new Schema(
  {
    url: {
      type: String,
    },
    customerId: {
      type: String,
    },
    userName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MuaImage = models.MuaImage || model("MuaImage", MuaImageSchema);

export default MuaImage;

import { Schema, model, models } from "mongoose";

const galleryImageScheme = new Schema(
  {
    index: {
      type: Number,
    },
    url: {
      type: String,
    },
    category: {
      type: String,
    },
    subCategory: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const GalleryImage =
  models.GalleryImage || model("GalleryImage", galleryImageScheme);

export default GalleryImage;

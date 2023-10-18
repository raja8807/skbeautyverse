import { Schema, model, models } from "mongoose";

const reviewSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    rating: {
      type: Number,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ReviewModal = models.ReviewModal || model("ReviewModal", reviewSchema);

export default ReviewModal;

import { Schema, model, models } from "mongoose";

const customerSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      unique: true,
    },
    isApproved: {
      type: Boolean,
    },
    phoneNumber: {
      type: String,
    },
    customerId: {
      required: true,
      type: String,
    },
    imageUrl: {
      type: String,
    },
    about: {
      type: String,
    },
    location: {
      type: String,
    },
    profession: {
      type: String,
    },
    designations: {
      type: Array,
    },
    instaUrl: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = models.Customer || model("Customer", customerSchema);

export default Customer;

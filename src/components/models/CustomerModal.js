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
  },
  {
    timestamps: true,
  }
);

const Customer = models.Customer || model("Customer", customerSchema);

export default Customer;

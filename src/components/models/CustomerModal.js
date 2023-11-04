import { Schema, model, models } from "mongoose";

const customerSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    customerId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = models.Customer || model("Customer", customerSchema);

export default Customer;

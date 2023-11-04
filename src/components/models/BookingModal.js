import { Schema, model, models } from "mongoose";

// {
//     _id: "jaebjf",
//     date: "10/11/2023",
//     slot: "3",
//     status: "Confirmed",
//     packageId: "1",
//     categoryId: "2",
//     location: "chennai",
//     customer: {
//       name: "Raja",
//       phoneNumber: "987654321",
//       customerId: "1234",
//       email: "abcd@gmail.com",
//     },
//   },

const customerSchema = new Schema({
  name: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  customerId: {
    type: String,
  },
  email: {
    type: String,
  },
});

const bookingSchema = new Schema(
  {
    date: {
      type: String,
    },
    slot: {
      type: String,
    },
    status: {
      type: String,
    },
    packageId: {
      type: String,
    },
    categoryId: {
      type: String,
    },
    location: {
      type: String,
    },
    customer: {
      type: customerSchema,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = models.Booking || model("Booking", bookingSchema);

export default Booking;

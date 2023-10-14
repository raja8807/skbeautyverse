import { Schema, model, models } from "mongoose";

// {
//     head: "BEAUTY-WORLD",
//     price: "5,999",
//     body: [
//       "BASIC MAKEUP",
//       "BASIC HAIRSTYLES",
//       "1 SAREE DRAPPING",
//       "MAKEUP FOR GROOM",
//       "SINGLE SESSION",
//     ],
//   },

const packageSchema = new Schema({
    head: {
    type: String,
   
  },
  price: {
    type: String,
   
  },
  body: {
    type: [String],
  },
},
{
    timestamps : true
});

const Package = models.Package || model("Package", packageSchema);

export default Package;

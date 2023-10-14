import { Schema, model, models } from "mongoose";

const testSchema = new Schema({
  text: {
    type: String,
   
  },
},
{
    timestamps : true
});

const Test = models.Test || model("Test", testSchema);

export default Test;

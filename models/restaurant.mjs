import { Schema, model } from "mongoose";

const restaurantSchema = new Schema({
  name: String,
  ownerEmail: String,
  password: String,
  menu: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
  qrCodeUrl: String,
});

export default model("Restaurant", restaurantSchema);

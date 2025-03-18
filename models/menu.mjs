import { Schema, model } from "mongoose";

const menuSchema = new Schema({
  itemName: String,
  price: Number,
  imageUrl: String,
  category: String,
  restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant" },
});

export default model("Menu", menuSchema);

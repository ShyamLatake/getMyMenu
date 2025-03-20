import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: String,
  contact: String,
  qrCode: String,
  menuUrl: String,
  specialOffers: {
    type: [
      {
        title: { type: String, required: true },
        description: String,
        validTill: {
          type: Date,
          required: true,
          validate: {
            validator: (v) => v > new Date(),
            message: 'Valid till date should be in the future',
          },
        },
        applicableDishes: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Menu',
        }],
      }
    ],
    default: null,
  },
});
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
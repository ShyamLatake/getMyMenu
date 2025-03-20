import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'Restaurant reference is required'],
  },
  primaryCategory: {
    type: String,
    required: [true, 'Primary category is required'],
  },
  secondaryCategory: {
    type: String,
    required: [true, 'Secondary category is required'],
  },
  subCategory: {
    type: String,
    required: false,
  },
  itemName: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
    minlength: [3, 'Item name must be at least 3 characters long'],
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  type: {
    type: String,
    required: [true, 'Food type is required'],
    enum: ['veg', 'non-veg'],
  },
  isSpecial: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    validate: {
      validator: (v) => /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg))$/.test(v),
      message: 'Invalid image URL',
    },
    default: '',
  },
  offerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer',
  },
}, { timestamps: true });

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;

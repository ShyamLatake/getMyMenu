import { genSalt, hash, compare } from "bcryptjs";
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import Restaurant from "../models/restaurant.mjs";

export async function register(req, res) {
  try {
    const { name, ownerEmail, password } = req.body;

    // Check if restaurant already exists
    // let restaurant = await Restaurant.findOne({ ownerEmail });
    let restaurant;
    // if (restaurant)
    //   return res.status(400).json({ message: "Email already in use" });

    // Hash Password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Create Restaurant
    restaurant = new Restaurant({ name, ownerEmail, password: hashedPassword });
    await restaurant.save();

    // Generate Token
    const token = sign({ id: restaurant._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ token, restaurant });
  } catch (error) {
    console.log("🚀 ~ exports.register= ~ error:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { ownerEmail, password } = req.body;

    // Find Restaurant
    const restaurant = await Restaurant.findOne({ ownerEmail });
    if (!restaurant)
      return res.status(400).json({ message: "Invalid Credentials" });

    // Check Password
    const isMatch = compare(password, restaurant.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    // Generate Token
    const token = sign({ id: restaurant._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, restaurant });
  } catch (error) {
    console.log("🚀 ~ exports.login= ~ error:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

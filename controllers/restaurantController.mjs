import Restaurant from "../models/restaurant.mjs";
import generateQRCode from "../utils/generateQRCode.mjs";

export async function createRestaurant(req, res) {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


export const restaurantQR = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).send("Restaurant not found");
    }

    if (!restaurant.qrCodeUrl) {
      restaurant.qrCodeUrl = await generateQRCode(restaurant._id);
    }
    console.log("restaurant",restaurant);

    res.render("restaurantQr", { restaurant });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).send("Server Error");
  }
};

export async function getRestaurant(req, res) {
  try {
    const restaurant = await Restaurant.findById(req.params.id)

    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}



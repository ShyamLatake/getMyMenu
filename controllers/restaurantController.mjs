import Restaurant from "../models/restaurant.mjs";
import generateQRCode from "../utils/generateQRCode.mjs";

export async function createRestaurant(req, res) {
  try {
    const { name, ownerEmail, password } = req.body;

    // Check if email exists
    let restaurant = await Restaurant.findOne({ ownerEmail });
    // if (restaurant)
    //   return res.status(400).json({ message: "Email already registered" });

    // Create QR Code
    const qrCodeUrl = await generateQRCode(restaurant._id);

    // Save restaurant
    restaurant = new Restaurant({ name, ownerEmail, password, qrCodeUrl });
    await restaurant.save();

    return res.status(404).json({ message: "Restaurant Created Successfully", id : restaurant._id });
  } catch (error) {
    console.log("🚀 ~ exports.createRestaurant = ~ error:", error);
    res.status(500).json({ message: "Server Error" });
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

    res.render("restaurantQr", { restaurant });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).send("Server Error");
  }
};

export async function getRestaurant(req, res) {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate(
      "menu"
    );
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

import Menu from "../models/menu.mjs";

export async function addMenuItem(req, res) {
  try {
    const { itemName, price, imageUrl, category, restaurantId } = req.body;

    const menuItem = new Menu({
      itemName,
      price,
      imageUrl,
      category,
      restaurantId,
    });
    await menuItem.save();

    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getMenu(req, res) {
  try {
    const menu = await Menu.find({ restaurantId: req.params.restaurantId });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

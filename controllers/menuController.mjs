import Menu from "../models/menu.mjs";
import Restaurant from "../models/restaurant.mjs";

export const addMenuForRestaurant = async (req, res) => {
  try {
    const menuData = { ...req.body, restaurantId: req.params.id };
    const menu = new Menu(menuData);
    await menu.save();
    res.status(201).json(menu);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send("Restaurant not found");
    }

    const menuItems = await Menu.find({ restaurantId }).lean();

    // Group menu by Primary → Secondary → SubCategory
    let groupedMenu = {};
    menuItems.forEach(item => {
      if (!groupedMenu[item.primaryCategory]) {
        groupedMenu[item.primaryCategory] = {};
      }
      if (!groupedMenu[item.primaryCategory][item.secondaryCategory]) {
        groupedMenu[item.primaryCategory][item.secondaryCategory] = {};
      }
      if (!groupedMenu[item.primaryCategory][item.secondaryCategory][item.subCategory]) {
        groupedMenu[item.primaryCategory][item.secondaryCategory][item.subCategory] = [];
      }
      groupedMenu[item.primaryCategory][item.secondaryCategory][item.subCategory].push(item);
    });

    res.render("menu", { restaurant, groupedMenu });
  } catch (error) {
    res.status(500).send("Error fetching menu");
  }
};

export const getMenuItem = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate(
      "restaurantId",
      "name"
    );
    if (!menu) return res.status(404).json({ error: "Menu item not found" });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMenuItems = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!menu) return res.status(404).json({ error: "Menu item not found" });
    res.json(menu);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) return res.status(404).json({ error: "Menu item not found" });
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

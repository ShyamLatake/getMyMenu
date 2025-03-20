import { Router } from "express";
import {  getMenuItem, updateMenuItems,deleteMenuItem, getMenuByRestaurant ,addMenuForRestaurant} from "../controllers/menuController.mjs";
const router = Router();


router.get("/:restaurantId", getMenuByRestaurant);
router.post("/restaurants/:id", addMenuForRestaurant);

// Menu documnet Manipulation Routes
// router.get("/:id", getMenuItem);
router.put("/:id",updateMenuItems);
router.delete("/:id",deleteMenuItem);

export default router;

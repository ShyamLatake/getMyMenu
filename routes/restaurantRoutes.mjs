import { Router } from "express";
import { createRestaurant, getRestaurant, restaurantQR } from "../controllers/restaurantController.mjs";
import restaurant from "../models/restaurant.mjs";
const router = Router();

router.post("/", createRestaurant);
router.get("/:id", getRestaurant);
router.get("/qr/:id", restaurantQR)


export default router;

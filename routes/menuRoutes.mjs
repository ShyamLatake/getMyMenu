import { Router } from "express";
import { addMenuItem, getMenu } from "../controllers/menuController.mjs";
const router = Router();

router.post("/", addMenuItem);
router.get("/:restaurantId", getMenu);

export default router;

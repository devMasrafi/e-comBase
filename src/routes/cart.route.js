import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { createCart, updateQuantity } from "../controllers/cart.controller.js";
const router = e.Router()

router.route("/carts/create").post(createCart)
router.route("/carts/update").post(updateQuantity)



export default router
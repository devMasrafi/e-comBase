import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { allOrders, createOrder } from "../controllers/order.controller.js";
const router = e.Router()

router.route("/orders/create").post(auth, createOrder)
router.route("/orders").get(auth, allOrders)



export default router
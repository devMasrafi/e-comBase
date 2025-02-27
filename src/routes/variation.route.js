import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { createVariation } from "../controllers/variation.controller.js";
const router = e.Router()

router.route("/variations/create").post(auth, adminAuth, createVariation)



export default router
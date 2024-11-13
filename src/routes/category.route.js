import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { categryCreate } from "../controllers/category.controller.js";
const router = e.Router()

router.route("/categories/create").post(auth, adminAuth, categryCreate)



export default router
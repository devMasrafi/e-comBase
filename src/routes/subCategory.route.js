import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { allSubCategories, subCategryCreate } from "../controllers/subCategory.controller.js";
const router = e.Router()

router.route("/subcategories/create").post(auth, adminAuth, subCategryCreate)
router.route("/subcategories").get(allSubCategories)



export default router
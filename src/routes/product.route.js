import e from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { createProduct, products } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = e.Router()

router.route("/products/create").post(upload.fields([{ name: 'thumbnail' }, { name: 'gallery', maxCount: 4 }]), createProduct)
router.route("/products").get(products)



export default router
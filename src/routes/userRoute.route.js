import e from "express";
import { createUser, emailVerify, login, logout, userUpdate } from "../controllers/userController.controller.js";
import { validation } from "../middlewares/validation.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"
import { auth } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
const router = e.Router()

router.route("/users").get(createUser)
router.route("/users/create").post(validation, createUser)
router.route("/users/:link").get(emailVerify)
router.route("/users/logout").post(auth,logout)
router.route("/users/update").post(auth, upload.single("profilePic"), userUpdate)
router.route("/users/login").post(login)


export default router
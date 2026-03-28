import express from "express"
import {allUser, changePassword, fogotPassword, getUserById, login, logout, register, reVerify, updateUser, verify, verifyOTP} from "../controllers/userController.js"
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleStorage } from "../middleware/multer.js";
const router = express.Router();

router.post("/register",register);
router.post("/verify" , verify);
router.post("/reverify", reVerify);
router.post("/login", login);
router.post("/logout", isAuthenticated,logout);
router.post("/forgot-password",isAuthenticated,fogotPassword);
router.post("/verify-otp/:email",verifyOTP);
router.post("/change-password/:email",changePassword);
router.get("/all-user",isAuthenticated, isAdmin, allUser);
router.get("/get-user/:userId",getUserById);
router.put("/update/:id", isAuthenticated, singleStorage , updateUser)
export default router;
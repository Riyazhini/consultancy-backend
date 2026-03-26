import express from "express";
import { registerUser, loginUser, getStaff } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", verifyToken, isAdmin, registerUser);
router.post("/login", loginUser);
router.get("/staff", verifyToken, isAdmin, getStaff);
router.get("/ping", (req, res) => res.json({ message: "Auth route is working!" }));

export default router;
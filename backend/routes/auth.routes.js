import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Checks if a user is authenticated via their cookie
router.get("/check", protectRoute, (req, res) => {
    res.status(200).json(req.user);
});

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;

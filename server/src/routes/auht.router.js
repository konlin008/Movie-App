import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { me } from "../controllers/auth.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", isAuthenticated, me);
export default router;

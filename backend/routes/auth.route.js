import express from "express";
import { login, logout, checkLogin,register } from "../controllers/auth.controller.js";
import  {checkUserLogin}  from "../middlewares/checkLogin.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Protected route to check login status on reload
router.get("/check-login", checkUserLogin, checkLogin);

export default router;
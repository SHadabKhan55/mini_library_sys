import express from "express"
import {
    getPendingStudents,
    isLogin,
    login,
    logout,
    register
} from "../controller/auth.controller.js"
import checkUserLogin from "../middleware/checkLogin.js"
import isApproved from "../middleware/checkApproval.js"
const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

router.get("/check-login", checkUserLogin, isApproved, isLogin);
router.get("/pending-students", checkUserLogin, getPendingStudents);
export default router


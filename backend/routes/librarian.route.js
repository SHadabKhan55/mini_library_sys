import express from "express"
import checkUserLogin from "../middleware/checkLogin.js"
import { approveStudent, getPendingStudents } from "../controller/librarian.controller.js";
const router = express.Router()

router.get("/pending-students", checkUserLogin, getPendingStudents);
router.patch("/approve-student/:id", approveStudent);
export default router


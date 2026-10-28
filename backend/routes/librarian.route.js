import express from "express";
import checkUserLogin from "../middleware/checkLogin.js";

import {
    approveStudent,
    createCategory,
    getCategory,
    singleCategory,
    updateCategory,
    deleteCategory,
    getPendingStudents,
    createBook,
    getBooks
} from "../controller/librarian.controller.js";

const router = express.Router();

// Students
router.get("/pending-students", checkUserLogin, getPendingStudents);
router.patch("/approve-student/:id", checkUserLogin, approveStudent);

// Categories
router.post("/add-category", checkUserLogin, createCategory);
router.get("/categories", checkUserLogin,  getCategory);
router.get("/categories/:id", checkUserLogin, singleCategory);
router.put("/categories/:id", checkUserLogin, updateCategory);
router.delete("/categories/:id", checkUserLogin, deleteCategory);

// Books
router.post("/add-book", checkUserLogin, createBook);
router.get("/book", checkUserLogin, getBooks);

export default router;

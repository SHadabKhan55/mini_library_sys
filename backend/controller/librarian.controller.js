import User from "../model/user.model.js";
import Category from "../model/category.model.js";
import Book from "../model/book.model.js";
import BorrowRecord from "../model/borrowRecord.js";


export async function getPendingStudents(req, res) {
    try {
        const students = await User.find({
            role: "student",
            isApproved: false
        }).select("-password");

        return res.status(200).json({
            success: true,
            students
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch pending students"
        });
    }
}


export async function approveStudent(req, res) {
    try {
        const { id } = req.params;

        const student = await User.findByIdAndUpdate(
            id,
            {
                isApproved: true
            },
            {
                new: true
            }
        ).select("-password");

        if (!student || student.role !== "student") {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student approved successfully",
            student
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to approve student"
        });
    }
}



export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const category = await Category.findOne({ name })
        if (category) {

            return res.status(409).json({
                success: false,
                message: "Category already exist",

            });
        }
        const newCategory = await Category.create({
            name,
            description,
        });

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: newCategory,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCategory = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = req.query.limit === "all" ? 0 :5;
        let skip = (page - 1) * limit;
        let categories;
        if (req.query.limit === "all") {
            
             categories = await Category.find()
        } else {
            
             categories = await Category.find()
            .sort({_id:-1})
            .skip(skip)
            .limit(limit)
        }

        const totalCategories = await Category.countDocuments();
        const totalPages = limit === 0 ? 0 : Math.ceil(totalCategories / limit)
        
        return res.status(200).json({
            success: true,
            message: "category fetch successfull",
            categories,
            totalPages,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Fetch categories failed due to server error"
        });
    }
};

export const singleCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            data: category,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const category = await Category.findByIdAndUpdate(
            id,
            {
                name,
                description,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category,
        });
    } catch (error) {
        console.log(error);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Category name already exists",
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: category,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//=============================================
//                  Books Api
//=============================================

export const createBook = async (req, res) => {
  try {
    const { title, author, price, quantity, category } = req.body;

    const book = await Book.create({
      title,
      author,
      price,
      quantity,
      category,
    });

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


 
export const getBooks = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = req.query.limit === "all" ? 0 : 5;
        let search = req.query.search || "";

        let book;
        let skip = (page - 1) * limit;

        // Search query
        let query = {};

        if (search) {
            query.title = {
                $regex: search,
                $options: "i"
            };
        }
        


        if (req.query.limit === "all") {

            book = await Book.find(query)
                .populate('category')
                .sort({ _id: -1 });

        } else {

            book = await Book.find(query)
                .populate('category')
                .sort({ _id: -1 })
                .skip(skip)
                .limit(limit);
        }

        // Count matching books
        const totalBooks = await Book.countDocuments(query);

        const totalPages = limit === 0
            ? 0
            : Math.ceil(totalBooks / limit);

        return res.status(200).json({
            success: true,
            message: "Books fetched successfully",
            book,
            totalBooks,
            totalPages
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Fetch books failed due to server error"
        });
    }
};



export const createBorrow = async (req, res) => {
    try {

        const { bookId } = req.body;

        if (!bookId) {
            return res.status(400).json({
                success: false,
                message: "Book ID is required",
            });
        }

        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        if (book.quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Book is not available",
            });
        }

        // Automatically set return date after 1 month
        const borrowDate = new Date();
        const returnDate = new Date(borrowDate);
        returnDate.setMonth(returnDate.getMonth() + 1);

        const studentId = req.user.id;

        const newBorrow = await BorrowRecord.create({
            student: studentId,
            book: bookId,
            borrowDate,
            returnDate,
        });

        book.quantity -= 1;
        await book.save();

        return res.status(201).json({
            success: true,
            message: "Book borrowed successfully. Please return within one month.",
            data: newBorrow,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getBorrow = async (req, res) => {
    try {

        const studentId = req.user.id;

        const borrowRecords = await BorrowRecord.find({
            student: studentId,
        })
            .populate("book", "title author")
            .sort({ createdAt: -1 });

        const data = borrowRecords.map((record) => {

            const today = new Date();

            // Default values
            let lateDays = 0;
            let fineAmount = 0;
            let daysRemaining = 0;

            if (record.status === "borrowed") {

                // Check if book is late
                if (today > record.returnDate) {

                    const difference = today - record.returnDate;

                    lateDays = Math.ceil(
                        difference / (1000 * 60 * 60 * 24)
                    );

                    fineAmount = lateDays * record.finePerDay;

                } else {

                    const difference = record.returnDate - today;

                    daysRemaining = Math.ceil(
                        difference / (1000 * 60 * 60 * 24)
                    );
                }

            } else {

                // Book already returned
                if (record.actualReturnDate > record.returnDate) {

                    const difference =
                        record.actualReturnDate - record.returnDate;

                    lateDays = Math.ceil(
                        difference / (1000 * 60 * 60 * 24)
                    );

                    fineAmount = lateDays * record.finePerDay;
                }
            }

            return {
                ...record.toObject(),
                lateDays,
                fineAmount,
                daysRemaining,
            };
        });

        return res.status(200).json({
            success: true,
            data,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
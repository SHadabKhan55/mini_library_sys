import User from "../model/user.model.js";

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

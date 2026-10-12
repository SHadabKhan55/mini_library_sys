import User from "../model/user.model.js";

async function isApproved(req, res, next) {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.role === "student" && !user.isApproved) {
            return res.status(403).json({
                message: "Your account is pending approval"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
}

export default isApproved;
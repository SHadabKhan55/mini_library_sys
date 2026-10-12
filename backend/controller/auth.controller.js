import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import { setUser } from "../services/auth.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({
      name,
      email,
      password: hashedPassword,

    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

export async function login(req, res) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }
    
    const isMatch = await bcrypt.compare(password,user.password)
    
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = setUser(user)
    res.cookie("uid",token,{
      httpOnly:true,
      maxAge: 24 * 60*60*60*1000
    })
    res.status(200).json({
      success: true,
      message: "Login successful",
      user
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  } 
}

export async function isLogin(req, res) {
    try {
        console.log('isLogin',req.user)
        const user = await User.findById(req.user.id)
            .select("-password")
        if (user) {
            return res.status(200).json({
                success: true,
                message: "user is login",
                user
            })
        }
        return res.status(401).json({
            success: false,
            message: "user is not login"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }

}


export function logout(req, res) {
    try {

        res.clearCookie("uid", {
            httpOnly: true
        })

        return res.status(200).json({
            success: true,
            message: "logout successfull"
        })
      } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

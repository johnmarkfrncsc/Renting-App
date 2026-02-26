import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/UserSchema.js";

const signup = async (data) => {
  if (!data.password || data.password.trim().length < 8) {
    return {
      success: false,
      message: "Password must be at least 8 characters long",
    };
  }
  try {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return {
        success: false,
        message: "Email is already exists",
      };
    }
    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = new User({
      name: data.name,
      email: data.email,
      password: hashPassword,
      role: data.role || "user",
    });

    const savedUser = await user.save();
    const { password, ...userWithoutPassword } = savedUser.toObject();

    return {
      success: true,
      data: userWithoutPassword,
    };
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");
      return {
        success: false,
        message: messages,
        data: null,
      };
    }
  }
};

const login = async (data) => {
  try {
    const loginUser = await User.findOne({ email: data.email });
    if (!loginUser) {
      return {
        success: false,
        message: "Email not found",
      };
    }
    const passwordMatch = await bcrypt.compare(
      data.password,
      loginUser.password,
    );

    if (!passwordMatch) {
      return {
        success: false,
        message: "Password does not match",
      };
    }

    const token = jwt.sign(
      { id: loginUser._id, role: loginUser.role },
      process.env.JWT_SECRET, //secret key in env
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }, //token expiry in env
    );

    return {
      success: true,
      data: token,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error in login service",
      data: null,
    };
  }
};

export default {
  signup,
  login,
};

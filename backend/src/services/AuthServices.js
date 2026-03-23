import generateToken from "../utils/generateToken.js";
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

    const token = generateToken(savedUser._id, savedUser.role);

    return {
      success: true,
      data: {
        token,
        role: savedUser.role,
        id: savedUser._id,
      },
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

    const token = generateToken(loginUser._id, loginUser.role);

    return {
      success: true,
      data: {
        token,
        role: loginUser.role,
        id: loginUser._id,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error in login service",
      data: null,
    };
  }
};

const googleLogin = async (token) => {
  try {
    const googleRes = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const googleUser = await googleRes.json();
    const googleEmail = await User.findOne({ email: googleUser.email });
    if (googleEmail) {
      const token = generateToken(googleEmail._id, googleEmail.role);
      return {
        success: true,
        data: {
          token,
          role: googleEmail.role,
          id: googleEmail._id,
        },
      };
    } else {
      const newUser = new User({
        name: googleUser.name,
        email: googleUser.email,
        password: "google-oauth", // No password for Google users
        role: "user",
      });
      const savedUser = await newUser.save();

      const token = generateToken(savedUser._id, savedUser.role);
      return {
        success: true,
        data: {
          token,
          role: savedUser.role,
          id: savedUser._id,
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error in googleLogin service",
      data: null,
    };
  }
};

export default {
  signup,
  login,
  googleLogin,
};

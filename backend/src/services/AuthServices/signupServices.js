import generateToken from "../../utils/generateToken.js";
import bcrypt from "bcrypt";
import User from "../../model/UserSchema.js";

const signupServices = async (data) => {
  try {
    if (!data.password || data.password.trim().length < 8) {
      return {
        success: false,
        message: "Password must be at least 8 characters long",
      };
    }
    const existingUser = await User.findOne({
      email: data.email,
    });
    if (existingUser) {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = await new User({
      name: data.name,
      email: data.email,
      password: hashPassword,
      role: data.role || "user",
    }).save();

    const token = generateToken(user._id, user.role);

    return {
      success: true,
      data: {
        token,
        role: user.role,
        id: user._id,
      },
    };
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors)
        .map((error) => error.message)
        .join(", ");
      return {
        success: false,
        message: messages,
        data: null,
      };
    }
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export default signupServices;

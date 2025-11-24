import User from "../model/UserSchema.js";
import bcrypt from "bcrypt";

const signup = async (data) => {
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
    return {
      success: false,
      message: "Error in signup service",
      data: null,
    };
  }
};

const login = async (data) => {
  const loginUser = await User.findOne({ email: data.email });
  if (!loginUser) {
    return {
      success: false,
      message: "Email not found",
    };
  }
  const passwordMatch = await bcrypt.compare(data.password, loginUser.password);

  if (!passwordMatch) {
    return {
      success: false,
      message: "Password does not match",
    };
  }

  const { password, ...loginWithoutPassword } = loginUser.toObject();
  return {
    success: true,
    data: loginWithoutPassword,
  };
};

export default {
  signup,
  login,
};

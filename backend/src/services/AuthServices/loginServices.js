import generateToken from "../../utils/generateToken.js";
import bcrypt from "bcrypt";
import User from "../../model/UserSchema.js";

const loginServices = async (data) => {
  try {
    if (!data.email || !data.password) {
      return {
        success: false,
        message: "Email and password are required",
      };
    }

    const invalidCredentials = "Invalid email or password";

    const loginUser = await User.findOne({
      email: data.email.toLowerCase().trim(),
    });
    if (!loginUser) {
      return {
        success: false,
        message: invalidCredentials,
      };
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      loginUser.password,
    );
    if (!passwordMatch) {
      return {
        success: false,
        message: invalidCredentials,
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

export default loginServices;

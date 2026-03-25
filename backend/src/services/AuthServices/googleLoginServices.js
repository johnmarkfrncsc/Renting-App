import generateToken from "../../utils/generateToken.js";
import User from "../../model/UserSchema.js";

const googleLoginService = async (googleToken, role) => {
  try {
    const googleRes = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      { headers: { Authorization: `Bearer ${googleToken}` } },
    );

    if (!googleRes.ok) {
      return {
        success: false,
        message: "Invalid Google token",
      };
    }

    const googleUser = await googleRes.json();
    const email = googleUser.email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      const token = generateToken(existingUser._id, existingUser.role);
      return {
        success: true,
        data: {
          token,
          role: existingUser.role,
          id: existingUser._id,
        },
      };
    }
    const newUser = new User({
      name: googleUser.name,
      email,
      password: "google-oauth", // No password for Google users
      role: role || "user",
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
  } catch (error) {
    return {
      success: false,
      message: "Error in googleLogin service",
      data: null,
    };
  }
};

export default googleLoginService;

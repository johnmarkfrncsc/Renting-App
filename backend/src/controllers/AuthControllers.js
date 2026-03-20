import AuthServices from "../services/AuthServices.js";

const signup = async (req, res) => {
  try {
    const data = req.body;
    const result = await AuthServices.signup(data);
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
    res.status(201).json({
      success: true,
      message: "successfully sign up",
      token: result.data.token,
      role: result.data.role,
      id: result.data.id,
    });
  } catch (error) {
    console.log("Error in signing up", error);
    res.status(500).json({ message: "Error in post signup request" });
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    const result = await AuthServices.login(data);
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
    res.status(200).json({
      success: true,
      message: `You've successfully log in`,
      token: result.data.token,
      role: result.data.role,
      id: result.data.id,
    });
  } catch (error) {
    console.log("Error in logging in", error);
    res.status(500).json({ message: "Error in post login request" });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const result = await AuthServices.googleLogin(token);
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
    res.status(200).json({
      success: true,
      message: `Successfully signed in with Google`,
      token: result.data.token,
      role: result.data.role,
      id: result.data.id,
    });
  } catch (error) {
    console.log("Error in Google login");
    res.status(500).json({ message: "Error in googleLogin request" });
  }
};

export default {
  signup,
  login,
  googleLogin,
};

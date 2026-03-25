import signupServices from "../../services/AuthServices/signupServices.js";

const signup = async (req, res) => {
  try {
    const data = req.body;

    const result = await signupServices(data);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }
    return res.status(201).json({
      success: true,
      message: "Sign up successfully",
      token: result.data.token,
      role: result.data.role,
      id: result.data.id,
    });
  } catch (error) {
    console.error("signup error: ", error);
    return res.status(500).json({
      success: false,
      message: "Error in signing up",
    });
  }
};

export default signup;

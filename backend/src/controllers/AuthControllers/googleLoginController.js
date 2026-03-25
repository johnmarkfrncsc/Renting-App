import googleLoginServices from "../../services/AuthServices/googleLoginServices.js";

const googleLogin = async (req, res) => {
  try {
    const { token, role } = req.body;

    const result = await googleLoginServices(token, role);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
    return res.status(200).json({
      success: true,
      message: `Successfully signed in with Google`,
      token: result.data.token,
      role: result.data.role,
      id: result.data.id,
    });
  } catch (error) {
    console.error("google login error :", error);
    return res.status(500).json({
      success: false,
      message: "Error google login",
    });
  }
};

export default googleLogin;

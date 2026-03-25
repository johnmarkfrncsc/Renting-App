import loginServices from "../../services/AuthServices/loginServices.js";

const login = async (req, res) => {
  try {
    const data = req.body;

    const result = await loginServices(data);
    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }
    return res.status(200).json({
      success: true,
      message: `You've successfully log in`,
      token: result.data.token,
      role: result.data.role,
      id: result.data.id,
    });
  } catch (error) {
    console.error("login error : ", error);
    return res.status(500).json({
      success: false,
      message: "Error logging in",
    });
  }
};

export default login;

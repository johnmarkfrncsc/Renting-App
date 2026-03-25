import postUsersService from "../../services/UserServices/postUsers.js";

const postUsers = async (req, res) => {
  try {
    const data = req.body;

    const result = await postUsersService(data);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }
    return res.status(201).json({
      success: true,
      message: "Successfully created a user",
    });
  } catch (error) {
    console.error("postUser error :", error);
    return res.status(500).json({
      success: false,
      message: "Error in creating new user",
    });
  }
};

export default postUsers;

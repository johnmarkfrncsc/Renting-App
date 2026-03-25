import getAllUserService from "../../services/UserServices/getAllUsers.js";

const getAllUser = async (req, res) => {
  try {
    const { query } = req.query;

    const users = await getAllUserService(query);
    return res.status(200).json({
      success: true,
      message: "You've successfully fetched all users",
      data: users.data,
    });
  } catch (error) {
    console.error("getAllUser error :", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching all users",
    });
  }
};

export default getAllUser;

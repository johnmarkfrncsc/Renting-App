import AuthServices from "../services/AuthServices.js";

const getAllUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await AuthServices.getAllUsers(query);
    return res.status(200).json({
      success: true,
      message: "You've successfully fetched all users",
      data: users.data,
    });
  } catch (error) {
    console.log("Error in fetching all rents", error);
    res.status(500).json({ messsage: "Error in fetching all rents" });
  }
};

const postUsers = async (req, res) => {
  try {
    const data = req.body;
    const result = await AuthServices.postUsers(data);
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.status(201).json({
      message: "User created successfully",
      data: result.data,
    });
  } catch (error) {
    console.log("Error in creating new user", error);
    res.status(500).json({ message: "Error in post request" });
  }
};

export default {
  getAllUsers,
  postUsers,
};

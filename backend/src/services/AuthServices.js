import User from "../model/UserSchema.js";

const getAllUsers = async () => {
  try {
    const query = {};
    const users = await User.find(query).sort({ createdAt: -1 });
    return {
      success: true,
      data: users,
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong.  getAllUsers services",
      data: null,
    };
  }
};

const postUsers = async (data) => {
  try {
    const user = new User(data);
    const saved = await user.save();
    return {
      success: true,
      data: saved,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export default {
  getAllUsers,
  postUsers,
};

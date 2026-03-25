import User from "../../model/UserSchema.js";

const getAllUsers = async () => {
  try {
    const query = {};
    const users = await User.find(query).sort({ createdAt: -1 });
    return {
      success: true,
      data: users,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong.",
      data: null,
    };
  }
};

export default getAllUsers;

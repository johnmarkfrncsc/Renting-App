import User from "../../model/UserSchema.js";

const postUsers = async (data) => {
  try {
    const user = await new User(data).save();
    return {
      success: true,
      data: user,
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

export default postUsers;

import User from "../model/UserSchema.js";

export async function getTestUser(req, res) {
  try {
    const query = {};
    const user = await User.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      message: "successfully fetched users",
      user: user,
    });
  } catch (error) {
    console.log("Error in getTestUser", error);
    res.status(500).json({ message: "Error 500 in getTestUser" });
  }
}

export async function postTestCreate(req, res) {
  try {
    const { email, password, name, role } = req.body;
    const newUser = new User({
      email: email,
      password: password,
      name: name,
      role: role,
    });
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "successfully created a user",
      savedUser: savedUser,
    });
  } catch (error) {
    console.log("Error in testing post test create", error);
    res.status(500).json({ message: "Error in test create 500" });
  }
}

import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to fetch users" });
  }
};

export const getUserDetails = async (req, res) => {
  const userId = req.params.id;
  // DEBUG: Log the type and value
  console.log("User ID received:", userId);
  console.log("Type of User ID:", typeof userId);
  if (!userId) {
    console.log("No params");
    return res.status(400);
  }

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }
};

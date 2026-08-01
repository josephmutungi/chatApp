import User from "../models/User.js";

export const getMyProfile = async (req, res) => {
  try {
    const userProfile = await User.findOne().select("-password");
    return res.status(200).json({ user: userProfile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

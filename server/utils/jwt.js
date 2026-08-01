import jwt from "jsonwebtoken";

export const signUser = async (userId) => {
  const token = await jwt.sign(userId, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

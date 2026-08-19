import { response } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { signUser } from "../utils/jwt.js";
import cookieParser from "cookie-parser";

export const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = await req.body;

    if (!email || !password || !confirmPassword) {
      return res.json({ error: "fill all the input fields." }).status(400);
    }

    if (password.trim() !== confirmPassword) {
      return res.json({ error: "Passwords don't match" }).status(400);
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.json({ error: "User already exist" }).status(400);
    }

    const hashedPassword = (await bcrypt.hash(password, 12)).toString();

    const user = new User({
      email: email,
      password: hashedPassword,
    });

    await user.save();

    return res.json({ message: "Account created!" }).status(201);
  } catch (error) {
    console.error(error);
    return res.json({ error: "Registration Error!" }).status(500);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Enter your both email and password!" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Email not registered!" });

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ error: "Invalid credentials!" });
    }

    const token = await signUser({
      userId: user._id,
      role: user.role,
      email: user.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error: ", error);
    return res.status(500).json({ error: "login failed!" });
  }
};

export const logout = async (req, res) => {
  const user = req.user.userId;
  if (!user) {
    return res.status(400).json({ error: "No user id found" });
  }
  try {
    const response = await res.clearCookie("token");
    return response.json({ message: "Logged out" }).status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Logout failed" });
  }
};

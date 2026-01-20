import User from "../../models/User.js";
import { generateToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/password.js";

export const register = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: "Missing details" });
  }
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(409)
        .json({ success: false, message: "User already exist" });
    }
    const hashedPassword = hashPassword(password);
    const user = await User.create({
      email: email,
      password: hashedPassword,
      role: role,
      lastLoginAt: new Date(),
    });

    const token = generateToken({
      userId: user._id,
      role: user.role,
    });

    return res.status(201).json({
      success: true,
      message: "User created Successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password is required" });
  }
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    if (!user.isActive) {
      return res
        .status(403)
        .json({ success: false, message: "Account is deactivated" });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ success: false, message: "Account not verified" });
    }

    const isMatched = await comparePassword(password, user.password);
    if (!isMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    user.lastLoginAt = new Date();
    await user.save();
    const token = generateToken({
      userId: user._id,
      role: user.role,
    });

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

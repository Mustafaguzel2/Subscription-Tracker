import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Validate request body
    const { name, email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    const newUser = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );
    // Generate JWT token
    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    // Commit transaction
    await session.commitTransaction();
    // End session
    session.endSession();
    // Send response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { token, user: newUser[0] },
    });
  } catch (error) {
    // Abort transaction
    await session.abortTransaction();
    // End session
    session.endSession();
    // Send error response
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: { token, user },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    // JWT'de gerçek bir "signOut" metodu yoktur
    // Oturum kapatma işlemi genellikle client tarafında token'ı silmek 
    // veya sunucu tarafında blacklist'e eklemekle yapılır
    
    // Basit bir yanıt döndürelim
    res.status(200).json({ 
      success: true,
      message: "User signed out successfully" 
    });
    
    // Not: Daha güvenli bir çözüm için token blacklist'i 
    // veya Redis gibi bir çözüm kullanılabilir
  } catch (error) {
    next(error);
  }
};

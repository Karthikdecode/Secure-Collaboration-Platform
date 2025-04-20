const User = require("../models/user");
const Otp = require("../models/otp");
const Message = require("../models/Message");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

//import nodemailer from 'nodemailer';
//import bcrypt from 'bcrypt';

var express = require("express");

const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(name, email, password, confirmPassword);

  try {
    // 1. Check for empty fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "All fields are required"
      });
    }

    // 2. Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "Passwords do not match"
      });
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists"
      });
    }

    // 4. Create and save new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    return res.status(200).json({
      status: true,
      message: "Signup successful"
    });

  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({
      status: false,
      message: "Signup error"
    });
  }
};
  
const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({ email: email });
  
      if (!findUser) {
        return res.status(404).json({ status: false, message: "User not found" });
      }
  
      if (password !== findUser.password) {
        return res.status(401).json({ status: false, message: "Invalid password" });
      }
  
      res.status(200).json({
        status: true,
        message: "Login successful",
        user: {
          name: findUser.name,
          email: findUser.email,
          id: findUser._id,
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ status: false, message: "Error during login" });
    }
  };

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// 1️⃣ SEND OTP Controller
const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ success: false, message: "User not found" });

    const otp = generateOtp();

    const hashedOtp = await bcrypt.hash(otp, 10);
    await Otp.create({ email, otp: hashedOtp });

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'laptopkarthik2002@gmail.com',
        pass: 'auju ewmm gsqv qwfe',
      },
    });

    const mailOptions = {
      from: 'laptopkarthik2002@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP for TASKPROJECT is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "OTP sent to email" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error sending OTP" });
    console.error(error);

  }
};

// 2️⃣ VERIFY OTP Controller
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) return res.status(400).json({ success: false, message: "OTP not found or expired" });

    const isValid = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValid) return res.status(400).json({ success: false, message: "Invalid OTP" });

    user.isVerified = true;
    await user.save();
    await Otp.deleteMany({ email }); // Clean up

    res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "OTP verification failed" });
  }
};

const get1detailsdashboard = async (req, res) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return res
          .status(400)
          .json({ status: false, message: "Email is required" });
      }
  
      const person = await User.findOne({
        email: email.toLowerCase(),
      });
      if (!person) {
        return res
          .status(404)
          .json({ status: false, message: "Employee not found" });
      }
  
      res.status(200).json({
        status: true,
        data: {
          name: person.name,
          email: person.email,

        },
      });
    } catch (error) {
      console.error("Error fetching employee details:", error);
      res
        .status(500)
        .json({ status: false, message: "Error fetching employee details" });
    }
  };


  const saveMessage = async (req, res) => {
    try {
      const { sender, receiver, message } = req.body;
      const newMessage = new Message({ sender, receiver, message });
      await newMessage.save();
      res.status(200).json({ status: true, message: 'Message saved' });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Error saving message' });
    }
  };
  
  const getMessages = async (req, res) => {
    try {
      const { sender, receiver } = req.body;
      const messages = await Message.find({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender }
        ]
      }).sort({ timestamp: 1 });
      res.status(200).json({ status: true, data: messages });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Error fetching messages' });
    }
  };
  
  

  module.exports = {
    register,
    Login,
    sendOtp,
    verifyOtp,
    get1detailsdashboard,
    saveMessage,
    getMessages

  };
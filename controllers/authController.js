import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const registerUser = async (req,res) => {

  try {
    const { name, email, password, role, phoneNumber } = req.body;

    // Validation Regex
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const phoneRegex = /^\d{10}$/;

    if (!nameRegex.test(name)) {
      return res.status(400).json({ message: "Invalid name. Use only letters and spaces (2-50 chars)." });
    }

    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ message: "Invalid phone number. Must be exactly 10 digits." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phoneNumber
    });

    await user.save();

    res.json({message:"User registered"});

  } catch(error){
    res.status(500).json({message:error.message});
  }

};


// Login
export const loginUser = async (req,res) => {

  try{

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({message:"User not found"});
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.status(400).json({message:"Invalid password"});
    }

    const token = jwt.sign(
      {id:user._id,role:user.role},
      "SECRET_KEY",
      {expiresIn:"1d"}
    );

    res.json({
      token,
      role: user.role,
      name: user.name
    });

  }catch(error){
    res.status(500).json({message:error.message});
  }

};

// Get All Staff
export const getStaff = async (req, res) => {
  try {
    console.log("--- GET STAFF START ---");
    console.log("Admin user id from token:", req.user?.id);
    const staff = await User.find({ role: "staff" }).select("-password");
    console.log(`Found ${staff.length} staff members in DB`);
    res.json(staff);
  } catch (error) {
    console.error("DATABASE ERROR in getStaff:", error);
    res.status(500).json({ message: "Database error while fetching staff." });
  }
};
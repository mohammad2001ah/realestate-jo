//import user models
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register user
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    //check if user already exists
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user'  // Default to 'user' if not specified
    });
    await newUser.save();

    //generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    //error handling
    res.status(500).json({ message: "Server error" });
  }
};

//Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    //compare password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    //generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users, excluding password field
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      count: users.length, 
      data: users 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update user (Admin only)
const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const userId = req.params.id;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already in use" });
      }
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();

    // Return user without password
    const updatedUser = await User.findById(userId).select('-password');
    res.status(200).json({ 
      success: true, 
      message: "User updated successfully", 
      data: updatedUser 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete user (Admin only)
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Prevent admin from deleting themselves
    if (req.user && req.user._id.toString() === userId) {
      return res.status(400).json({ success: false, message: "You cannot delete your own account" });
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ 
      success: true, 
      message: "User deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createUser, loginUser, getAllUsers, updateUser, deleteUser };

//import user models
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//register user
const createUser = async(req,res)=>{
  const{name,email,password}=req.body;
  try {
    //check if user already exists
    const existsUser =await User.findOne({email});
    if(existsUser){
      return res.status(400).json({message:"User already exists"});
    };

    //Hashed password
    const hashedPassword= await bcrypt.hash(password,10);

    //create new user
    const newUser =new User({
      name,
      email,
      password:hashedPassword,
    });
    await newUser.save();

    //generate JWT token
    const token=jwt.sign(
      {id:newUser._id , email:newUser.email},
      process.env.JWT_SECRET,
      {expiresIn:'1h'}
    );

    res.status(201).json({message:"User created successfully", token});


  } catch (error) {
    //error handling
    res.status(500).json({message:"Server error"});
  }
};

//Login User
const loginUser =async(req,res)=>{
  try {
    const{email,password}=req.body;
    //check if user exists
    const user =await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"Invalid email or password"});
    };
    //compare password
    const isMatched=await bcrypt.compare(password,user.password);
    if(!isMatched){
      return res.status(400).json({message:"Invalid email or password"});
    };
    //generate JWT token
    const token=jwt.sign(
      {id:user._id , email:user.email},
      process.env.JWT_SECRET,
      {expiresIn:'1h'}
    );
    res.status(200).json({message:"Login successful", token});
    
  } catch (error) {
    res.status(500).json({message:"Server error"});
  }
};




module.exports={createUser,loginUser};


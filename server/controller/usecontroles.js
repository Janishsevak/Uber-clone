import { validationResult } from "express-validator"
import { userModel as User } from "../models/usermodel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



export const register = async (req,res) =>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {fullname,email,password} = req.body;
        if(!fullname || !fullname.firstname || !fullname.lastname || !email || !password) {
            return res.status(400).json({message:"All fieds are required"});
        }

        const isUseralready = await User.findOne({email});
        if (isUseralready) {
            return res.status(400).json({ message: 'User already exist' });
        }

        const hashpassword = await bcrypt.hash(password,10);

        await User.create({
            fullname:{
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
            email,
            password:hashpassword
        });

        return res.status(201).json({
            message:"Account created successfully.",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const authcontroller ={
    login : async (req,res)=>{
        try {
            const {email,password}= req.body;
            console.log("Email:", email, "Password:", password);
            if (!email || !password){
                return res.status(400).json({ message: "All fields are required" });
            }
            const user = await User.findOne({email}).select('+password');
            if (!user) {
                return res.status(400).json({ message: "User not found", success: false });
              }
              const isMatch = await bcrypt.compare(password, user.password);
              if (!isMatch) {
                return res.status(400).json({ message: "Incorrect password", success: false });
              }
              
            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'});

            return res.status(200).cookie("token",token,{maxage:24*60*60*1000,httpOnly:true,sameSite:'none'})
            .json({
                success: true,
                message: "Login successful",
                token,
                user: {
                    _id: user._id,
                    email: user.email,
                    fullname: {
                      firstname: user.fullname?.firstname,
                      lastname: user.fullname?.lastname
                }}
            });
        } catch (error) {
            console.error("Login Error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },
    logout: (req, res) => {
        try {
            return res.status(200)
                .cookie("token", "", { maxAge: 0 })
                .json({ message: "Logged out successfully" });

        } catch (error) {
            console.error("Logout Error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    getprofile : async (req, res,next) => {
      try {
        res.status(200).json({ user: req.user });
    } catch (error) {
        next(error); // Pass any unexpected error to Express error handling middleware
    }
  }}
 


import { validationResult } from "express-validator"
import bcrypt, { compare } from "bcrypt"
import jwt from "jsonwebtoken"
import { Captain } from "../models/captainmodel.js";



export const captainregister = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { fullname, email, password, vehicle } = req.body;
  
      if (!fullname || !fullname.firstname || !fullname.lastname || !email || !password || !vehicle) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const isUserAlready = await Captain.findOne({ email });
      if (isUserAlready) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashpassword = await bcrypt.hash(password, 10);
  
      await Captain.create({
        fullname: {
          firstname: fullname.firstname,
          lastname: fullname.lastname,
        },
        email,
        password: hashpassword,
        vehicle: {
          color: vehicle.color,
          plate: vehicle.plate,
          capacity: vehicle.capacity,
          vehicleType: vehicle.vehicleType,
        },
      });
  
      return res.status(201).json({
        message: "Account created successfully.",
        success: true,
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
export const authcontroller ={
    login : async (req,res)=>{
        try {
            const {email,password}= req.body;
            if (!email || !password){
                return res.status(400).json({ message: "All fields are required" });
            }
            const captain = await Captain.findOne({ email }).select('+password');
            if (!captain) {
                return res.status(400).json({ message: "Incorrect username or password", success: false });
            }

            // Compare the provided password with the hashed password
            const isMatch = await bcrypt.compare(password, captain.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Incorrect username or password", success: false });
            }
            console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
            const token = jwt.sign({_id:captain._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'});

            return res.status(200).cookie("token",token,{maxAge:24*60*60*1000,httpOnly:true,sameSite:'strict'})
            .json({
                success: true,
                message: "Login successful",
                _id: captain._id,
                 token,
                 email: captain.email,
                 captain,                 
                 fullname: {
                    firstname: captain.fullname.firstname,
                    lastname: captain.fullname.lastname,},
                 vehicle: {
                    color: captain.vehicle.color,
                    plate: captain.vehicle.plate,
                    capacity: captain.vehicle.capacity,
                    vehicleType: captain.vehicle.vehicleType,    
        }})
        } catch (error) {
            console.error("Login Error:", error.message); // Logging the error message
            console.error("Error stack:", error.stack); // Logging the stack trace
            return res.status(500).json({ message: "Internal Server Error" });
        }

  },
    getprofile : async (req, res,next) => {
      try {
        res.status(200).json({ captain: req.captain });
    } catch (error) {
        next(error); // Pass any unexpected error to Express error handling middleware
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

    changepassword:async (req,res)=>{
      try {
        const { email , password, changepassword } = req.body;

        if(!email || !password || !changepassword)
          return res.status(400).json({message:"all fields are required"})

        const captain = await Captain.findOne({email}).select("+password");

        if(!captain)
          return res.status(400).json({message:"incorrct email and password"})

        //  compare password

        const isMatch = await bcrypt.compare(password,captain.password)

        if(!isMatch)
          return res.status(400).json({message:"incorrect password",success:false}) 

        // hashpassword

        const hashpassword = await bcrypt.hash(changepassword,10);
        captain.password = hashpassword

        await captain.save();

        return res.status(200).json({message:"password has been changed",sucess:true})
      
      } catch (error) {
        console.error("password changed error",error)
      }
    }
  };



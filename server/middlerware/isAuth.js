import jwt from "jsonwebtoken";
import { Captain } from "../models/captainmodel.js";
import { BlacklistTokenModel } from '../models/blacklisttoken.js';
import { userModel } from "../models/usermodel.js";

export const isAuthenicateuser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }


    const isBlacklisted = await BlacklistTokenModel.findOne({ token });
    console.log('Is Blacklisted:', isBlacklisted);

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
     
        const user = await userModel.findById(decoded.userId)
       
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user;

        return next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export const isAuthenicatecaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    console.log('Token:', token);
  if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
  }

  const isBlacklisted = await BlacklistTokenModel.findOne({ token: token });

  if (isBlacklisted) {
      return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("Decoded payload:", decoded);
      
      const captain = await Captain.findById(decoded._id);
      if (!captain) {
      return res.status(404).json({ message: "Captain not found." });
    }
      req.captain = captain;
      return next()
  } catch (err) {
      console.log(err);
      res.status(401).json({ message: 'Unauthorized' });
  }
}




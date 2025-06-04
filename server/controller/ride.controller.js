import { validationResult } from 'express-validator';
import  Ride  from '../models/ride.model.js';
import { getfare, getotp } from '../services/ride.services.js';
import getAddressCoordinates, { getCaptaininRadius } from '../services/goggle.js';
import { sendMessageToSocketId } from '../socket.js';

export const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;


    try {
        const fare = await getfare (pickup, destination, vehicleType);
        
        const ride = await Ride({
            user : req.user._id,
            pickup,
            destination,
            vehicleType,
            otp: await getotp(6),
            fare, 
        });
        await ride.save();
        res.status(201).json({ message: 'Ride created successfully', ride });

         const pickupcordinate = await getAddressCoordinates(pickup);
         console.log("Pickup Coordinates:", pickupcordinate);

         
         const captainInRadius = await getCaptaininRadius(pickupcordinate.lat, pickupcordinate.lng,5);
         console.log("Captain in Radius:", captainInRadius);

         const ridewithuser = await Ride.findById(ride._id).populate("user");

         captainInRadius.map(captain => {
            console.log(captain,ride);
            sendMessageToSocketId(captain.socketId, {
             event: "newRide",
             data: ridewithuser,
         })

        })

         
    } catch (error) {
        console.error('Error creating ride:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getvehicalefare = async (req, res) => {
    const { pickup, destination } = req.body;
    if (!pickup || !destination) {
    return res.status(400).json({ message: "Pickup and destination are required" });
  }

    const vehicleType = ["car", "auto", "moto"];
    const allfare = {};

    try {
        for (let i = 0; i < vehicleType.length; i++) {
          const type = vehicleType[i];
          const fare = await getfare(pickup, destination,type);
          allfare[type] = fare;
        }
         res.status(200).json({ allfare });
    } catch (error) {
        console.error('Error fetching fare:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

export const confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        await Ride.findByIdAndUpdate(rideId, {
            status: "confirmed",
            captain: req.captain._id,
        });

        // Fetch the ride with populated captain and user
        const ride = await Ride.findById(rideId)
            .populate({
                path: "captain",
                populate: { path: "vehicle" } 
            }).select("+otp")
            .populate("user");

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }


        sendMessageToSocketId(ride.user.socketId, {
            event: "rideConfirmed",
            data: ride,
        });

        res.status(200).json({ message: 'Ride confirmed successfully', ride });
    } catch (error) {
        console.error('Error confirming ride:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const startride = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.body;

    try {
        const ride = await Ride.findById(rideId).populate("user").populate("captain").select("+otp");

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        if (ride.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        await Ride.findByIdAndUpdate(rideId, {
            status: "started",
            captain: req.captain._id,
        });

        const populatedRide = await Ride.findById(rideId)
            .populate({
                path: "captain",
                populate: { path: "vehicle" }}).populate("user");

        sendMessageToSocketId(populatedRide.user.socketId, {
            event: "rideStarted",
            data: populatedRide,
        });

        res.status(200).json({ message: 'Ride started successfully', ride });
    } catch (error) {
        console.error('Error starting ride:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await Ride.findById(rideId).populate("user").populate("captain");

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        await Ride.findByIdAndUpdate(rideId, {
            status: "completed",
        });

        sendMessageToSocketId(ride.user.socketId, {
            event: "rideEnded",
            data: ride,
        });

        res.status(200).json({ message: 'Ride ended successfully', ride });
    } catch (error) {
        console.error('Error ending ride:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

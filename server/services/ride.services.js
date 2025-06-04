import Ride from "../models/ride.model.js";
import { getDistanceAndTime } from "./goggle.js";

async function getfare(pickup,destination,vehicleType) {
    if(!pickup || !destination ){
        throw new Error("Pickup ,destination  are required");
    }
    // Mock function to calculate fare based on distance
    const distance = await getDistanceAndTime(pickup, destination);
    const rates = {
        car: { baseFare: 50, perKm: 10, perMinute: 2 },
        auto: { baseFare: 30, perKm: 5, perMinute: 1 },
        moto: { baseFare: 20, perKm: 3, perMinute: 0.5 }
    };
    if (!rates[vehicleType]) {
        throw new Error("Invalid vehicle type");
    }
    const { baseFare, perKm, perMinute } = rates[vehicleType];
    const fare = baseFare + (distance.distance.value / 1000) * perKm + (distance.duration.value / 60) * perMinute;  
    return fare;
}

async function getotp(num) {
    if(!num){
        throw new Error("Number is required");
    }
    // Mock function to generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;

}


export {getfare,getotp};



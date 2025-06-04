import express from 'express';
import { body } from 'express-validator';
import { confirmRide, createRide, endRide, getvehicalefare,startride } from '../controller/ride.controller.js';
import { isAuthenicatecaptain, isAuthenicateuser } from '../middlerware/isAuth.js';


const router = express.Router();

router.post('/create',
   isAuthenicateuser,
   body('pickup').isString().withMessage('Pickup location is required'),
   body('destination').isString().withMessage('Destination is required'),
   body('vehicleType').isString().isIn(['car', 'auto', 'motorcycle']).withMessage('Vehicle type is required'),
   createRide
); 

router.post('/get-fare',
   isAuthenicateuser,
   body('pickup').isString().withMessage('Pickup location is required'),
   body('destination').isString().withMessage('Destination is required'),
   getvehicalefare
);

router.post('/acceptride',
   isAuthenicatecaptain,
   body('rideId').isString().withMessage('Ride ID is required'),
   body('captainId').isString().withMessage('Captain ID is required'),
   confirmRide
)

router.post('/start-ride',
   isAuthenicatecaptain,
   body('rideId').isString().withMessage('Ride ID is required'),
   body('otp').isString().withMessage('OTP is required'),
   startride
)

router.post('/end-ride',
   isAuthenicatecaptain,
   body('rideId').isString().withMessage('Ride ID is required'),
   endRide )

export default router;
import express from 'express';
import { Router } from 'express';
import { getcordinates, getDistanceAndTimeController, getsuggestions } from '../controller/maps.controller.js';
import { isAuthenicateuser } from '../middlerware/isAuth.js'; // Correct folder name
import { query } from 'express-validator';
import { getDistanceAndTime } from '../services/goggle.js';

const router = Router();

router.get(
  '/getcordinates',
  isAuthenicateuser,
  query('address').notEmpty().withMessage('Address is required'),
  getcordinates
);

router.get('/get-distance-time',
query('origin').notEmpty().withMessage('Origin is required'),
query('destination').notEmpty().withMessage('Destination is required'),  
getDistanceAndTimeController); 

router.get('/get-suggestions',
query('address').isString().isLength({ min: 1 }),
getsuggestions);
  


export default router;
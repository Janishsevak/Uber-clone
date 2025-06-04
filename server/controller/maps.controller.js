import getAddressCoordinates,{ getDistanceAndTime, getSuggestions } from '../services/goggle.js'; 
import { validationResult } from 'express-validator';

export const getcordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;
    console.log("Address received:", address); 
    try {
        const coordinates = await getAddressCoordinates(address); // Use the correct function
        console.log("Coordinates fetched:", coordinates); // Log the coordinates
        res.status(200).json({ success: true, coordinates });
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        res.status(500).json({ error: "Failed to fetch coordinates" });
    }
};

export const getDistanceAndTimeController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;  
        console.log("Origin:", origin); // Log the origin
        console.log("Destination:", destination); // Log the destination

        const distanceAndTime = await getDistanceAndTime(origin, destination); // Use the correct function
        console.log("Distance and time fetched:", distanceAndTime); // Log the distance and time
        res.status(200).json({ success: true, distanceAndTime });

    } catch (error) {
        console.error("Error fetching distance and time:", error.message);
        res.status(500).json({ error: "Failed to fetch distance and time" });
    }
}

export const getsuggestions = async (req, res) => {
    const { address } = req.query;
    console.log("Address for suggestions:", address); // Log the address
    try {
        const suggestions = await getSuggestions(address); // Use the correct function
        console.log("Suggestions fetched:", suggestions); // Log the suggestions
        res.status(200).json({ success: true, suggestions });
    } catch (error) {
        console.error("Error fetching suggestions:", error.message);
        res.status(500).json({ error: "Failed to fetch suggestions" });
    }
};


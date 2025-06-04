import axios from "axios";
import { Captain } from "../models/captainmodel.js";

const getAddressCoordinates = async (address) => {
  try {
    const apiKey = process.env.Google_api_key; // Ensure your API key is stored in environment variables
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    console.log("Request URL:", url); 
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error(`Geocoding API error: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw error;
  }
};

const getDistanceAndTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const apiKey = process.env.Google_api_key; // Ensure your API key is stored in environment variables
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "Zero Results") {
        throw new Error("No results found for the given origin and destination");
      }
      return response.data.rows[0].elements[0];
      
    } else {
      throw new Error(`Distance Matrix API error: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error fetching distance and time:", error.message);
    throw error;
    
  }
}

const getSuggestions = async (address) => {
  if (!address) {
    throw new Error("Address is required");
  }
   const apiKey = process.env.Google_api_key;
   const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(address)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    console.log("Google API Response:", response.data);
    if (response.data.status === "OK") {
      return response.data.predictions.map(prediction=>prediction.description).filter(value=>value);
      } else {
      throw new Error(`Autocomplete API error: ${response.data.status}`);
    }
  }
  catch (error) {
    console.error("Error fetching suggestions:", error.message);
    throw error;
  }
}

const getCaptaininRadius = async (lat,lng, radius) => {

  const captain = await Captain.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lat,lng], radius / 6371] // radius in km
      },
    }, 
  });
  if (!captain || captain.length === 0) {
    throw new Error("No captains found in the specified radius");
  }
  console.log("Captain in Radius:", captain);
  return captain;
}
  


export default getAddressCoordinates;
export { getDistanceAndTime };
export { getSuggestions };
export { getCaptaininRadius };
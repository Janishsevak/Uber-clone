import express from "express";
import { authcontroller, captainregister } from "../controller/captaincontroles.js";
import { isAuthenicatecaptain } from "../middlerware/isAuth.js";

const captainrouter = express.Router();

captainrouter.route("/captain-register").post(captainregister);
captainrouter.route("/cap-login").post(authcontroller.login);
captainrouter.route("/cap-logout").get(authcontroller.logout);
captainrouter.route("/cap-profile").get(isAuthenicatecaptain,authcontroller.getprofile)
captainrouter.route("/changepassword").post(isAuthenicatecaptain,authcontroller.changepassword)
export default captainrouter;
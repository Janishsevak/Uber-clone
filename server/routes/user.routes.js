import express from "express";
import { authcontroller, register } from "../controller/usecontroles.js";
import { isAuthenicateuser } from "../middlerware/isAuth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(authcontroller.login);
router.route("/logout").get(authcontroller.logout);
router.route("/profile").get(isAuthenicateuser,authcontroller.getprofile);

export default router;
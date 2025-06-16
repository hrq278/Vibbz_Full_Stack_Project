import express from "express";
import { userLogin, userSignUp, userLogout } from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/signup" , userSignUp);

router.post("/login" , userLogin);

router.get("/logout" , userLogout);

export default router
import express from "express"
import { commentPost, createPost, deletePost, likeUnlikePost, getAllPost } from "../controllers/post.controller.js";
import protectedRoute from "../middlewares/protectedRoute.middleware.js";


const router = express.Router()


router.get("/allpost", protectedRoute, getAllPost)
router.post("/create", protectedRoute, createPost)
router.post("/likeunlike", protectedRoute, likeUnlikePost)
router.post("/comment", protectedRoute, commentPost)
router.delete("/delete/:id", protectedRoute, deletePost)

export default router;
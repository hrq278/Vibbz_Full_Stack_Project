import express from "express"
import { commentPost, createPost, deletePost, likeUnlikePost, getAllPost, getLikedPost } from "../controllers/post.controller.js";
import protectedRoute from "../middlewares/protectedRoute.middleware.js";


const router = express.Router()


router.get("/allpost", protectedRoute, getAllPost)
router.get("/likedpost/:id", protectedRoute, getLikedPost)

router.post("/create", protectedRoute, createPost)
router.post("/likeunlike/:id", protectedRoute, likeUnlikePost)
router.post("/comment/:id", protectedRoute, commentPost)
router.delete("/delete/:id", protectedRoute, deletePost)

export default router;
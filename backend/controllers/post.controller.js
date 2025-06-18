import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/auth.model.js";
import { Post } from "../models/post.model.js";

const createPost = async (req,res) => {
    try {
        const {text} = req.body
        let {image} = req.body
    
        const userId = req.user._id.toString()
        
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({error: "User not found"})
        }
        // if (!(text && image)) {
        //     return res.status(400).json({error: "Post must have text and Image"})
        // }

        if (image) {
            const upload = await cloudinary.uploader.upload(image)
            if (!upload || !upload.secure_url) {
            return res.status(400).json({ error: "Image upload failed" });
            }
            image = upload.secure_url
        }

        const newPost = new Post({
            user: userId,
            text,
            image
        })

        const postCreated = await newPost.save()

        if (!postCreated) {
            return res.status(400).json({error: "Error in creating Post"})
        }

        return res.status(201).json({post:postCreated,
            message: "post created Successfully"
        })
    

    } catch (error) {
        console.log("Error in Create Post : ", error.message)
        return res.status(500).json({message:"internal server error",error: error.message})   
 
    }

}

const likeUnlikePost = async (req,res) => {
    try {
        const postId = req.params.id
        const userId = req.user._id

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(400).json({error: "Post not found"})
        }

        const userLikedPost = post.likes.includes(userId)
        if (!userLikedPost) {
            //unlike the Post
        await Post.updateOne({_id:postId},{$pull: {likes:userId}})

        return res.status(200).json({message:"Post unliked Successfullly"}) 
        
        }else{
            //unlike the Post

            post.likes.push(userId)
            await post.save();

            const notification = new Notification({
                from:userId,
                to: post.user,
                type: "like"
            })

            await notification.save()

            res.status(200).json({message: "Post liked Successfully"})
        }

    } catch (error) {
         console.log("Error in delete Post : ", error.message)
        return res.status(500).json({message:"internal server error",error: error.message})   
    }
}

const commentPost = async (req,res) => {
    try {
        const{text} = req.body
        const postId = req.params.id
        const userId = req.params._id


        if (!text) {
            return res.status(400).json({error: "text field is required"})
        }

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(400).json({error: "Post not found"})
        }

        const comment = {user: userId, text}

        post.comments.push(comment)
        
        await post.save()

        return res.status(200).json(post)
        
    } catch (error) {
         console.log("Error in delete Post : ", error.message)
        return res.status(500).json({message:"internal server error",error: error.message})   
    }
}

const deletePost = async (req,res) => {
    try {
       const post = await Post.findById(req.params.id)

       if (!post) {
        return res.status(404).json({error: "Post not found"})
       }

       if (post.user.toString() !== req.user._id.toString()) {
        return res.status(400).json({error: "You are not authorized to delete the post"})
       }

       if (post.image) {
        const imageId = post.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imageId)
       }

       await Post.findByIdAndDelete(req.params.id)

       return res.status(200).json({message: "Post deleted Successfully"})
        


    } catch (error) {
         console.log("Error in delete Post : ", error.message)
        return res.status(500).json({message:"internal server error",error: error.message})   
    }
}

const getAllPost = async (req,res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1});

        if (posts === 0) {
            return res.status(200).json([])
        }

        res.status(200).status(posts)


    } catch (error) {
        console.log("Error in getAllPost Post : ", error.message)
        return res.status(500).json({message:"internal server error",error: error.message})     
    }
}

export{
    createPost,
    likeUnlikePost,
    commentPost,
    deletePost,
    getAllPost
}
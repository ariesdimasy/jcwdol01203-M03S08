import express, { Router } from "express"
import { getAllPosts, createPost, getPostDetail, updatePost } from "../controllers/postController"

const router: Router = express.Router()

router.get("/", getAllPosts)
router.get("/:id", getPostDetail)
router.post("/", createPost)
router.put("/:id", updatePost)

export default router
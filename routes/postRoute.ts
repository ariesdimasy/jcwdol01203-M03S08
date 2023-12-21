import express, { Router } from "express"
import { getAllPosts } from "../controllers/postController"

const router: Router = express.Router()

router.get("/", getAllPosts)

export default router
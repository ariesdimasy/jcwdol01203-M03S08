import express, { Router } from "express"
import { getAllUsers, createUser } from "../controllers/userController"

const router: Router = express.Router()

router.get("/", getAllUsers)
router.post("/", createUser)

export default router
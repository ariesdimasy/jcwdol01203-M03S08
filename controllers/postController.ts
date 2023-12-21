import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export async function getAllPosts(req: Request, res: Response) {
    try {
        const users = await prisma.post.findMany({
            include: {
                user: true
            }
        })

        return res.status(200).send({
            success: true,
            message: "get all posts success",
            data: users
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: JSON.stringify(err)

        })
    }
}

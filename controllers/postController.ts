import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export async function getAllPosts(req: Request, res: Response) {
    try {
        const users = await prisma.post.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
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

export async function getPostDetail(req: Request, res: Response) {
    try {
        const userDetail = await prisma.post.findUnique({
            where: {
                id: Number(req.params.id)
            }
        })

        return res.status(200).send({
            success: true,
            message: "get user detail success",
            data: userDetail
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: JSON.stringify(err)

        })
    }
}

export async function createPost(req: Request, res: Response) {
    try {

        const { title, body, userId } = req.body

        if (title == "" || body == "" || userId == 0) {
            return res.status(400).send({
                success: false,
                message: "bad request",
                data: {}
            })
        }

        const user = await prisma.post.create({
            data: {
                title: title,
                body: body,
                userId: userId
            }
        })

        return res.status(200).send({
            success: true,
            message: "create post success",
            data: user
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: JSON.stringify(err)

        })
    }
}

export async function updatePost(req: Request, res: Response) {
    try {
        // paramater
        const { id } = req.params
        const { title, body, userId } = req.body

        if (title == "" || body == "" || userId == 0) {
            return res.status(400).send({
                success: false,
                message: "bad request",
                data: {}
            })
        }

        // query prisma 
        const user = await prisma.post.update({
            data: {
                title: title,
                body: body,
                userId: userId
            },
            where: {
                id: Number(id)
            }
        })

        // response success
        return res.status(200).send({
            success: true,
            message: "update post success",
            data: user
        })
    } catch (err) {
        // response error
        return res.status(500).send({
            success: false,
            message: JSON.stringify(err)

        })
    }
}



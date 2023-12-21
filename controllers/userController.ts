import { PrismaClient, Prisma } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany({
            include: {
                post: true
            }
        })

        return res.status(200).send({
            success: true,
            message: "get all users success",
            data: users
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: JSON.stringify(err)

        })
    }
}

export async function createUser(req: Request, res: Response) {
    try {

        const { name, email, password, post } = req.body
        let userBody: Prisma.UserCreateInput = {
            name: name,
            email: email,
            password: password,
            post: post
        }


        console.log(name, email, password, post)

        if (name == "" || email == "" || password == "") {
            return res.status(400).send({
                success: false,
                message: "request error",
                data: {}
            })
        }

        const user = await prisma.user.create({
            data: userBody,
        })

        // const post = await prisma.post.create({
        //     data: {
        //         title: "belajar golang sederhana",
        //         body: "belajar golang sederhana",
        //         userId: 1
        //     }
        // })

        return res.status(201).send({
            success: true,
            message: "create user success",
            data: user
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: JSON.stringify(err)

        })
    }
}
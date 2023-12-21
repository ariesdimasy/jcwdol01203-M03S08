import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export const createBranch = async (req: Request, res: Response) => {

    const transactionResult = await prisma.$transaction(async (prisma) => {
        try {
            const branch = await prisma.branch.create({
                data: req.body
            });

            return res.status(201).send({
                success: true,
                message: "create branch success",
                data: branch
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    })


}

export const getBranch = async (req: Request, res: Response) => {
    try {

        interface IFilterQuery {
            id?: number;
            name?: string;
        }

        const { id, name } = req.query

        const filterData: IFilterQuery = {}

        if (id) {
            filterData.id = parseInt(id as string)
        }

        if (name) {
            filterData.name = name as string
        }

        const branches = await prisma.branch.findMany({
            // skip: 2 * 1,
            // take: 2,
            // cursor: {
            //     id: 2 // page
            // },
            where: {
                name: {
                    contains: filterData.name
                },
                id: filterData.id
            },
            include: {
                manager: {
                    select: {
                        name: true,
                        branchId: true
                    }
                }
            }

        })

        // const branches = await prisma.branch.findMany({
        //     where: {
        //         AND: [
        //             {
        //                 location: {
        //                     not: {
        //                         contains: "sia"
        //                     }
        //                 },
        //                 name: {
        //                     notIn: ["Purwadhika Surabaya", "Purwadhika Jakarta"]
        //                 }
        //             }
        //         ],
        //         createdAt: {
        //             gte: new Date("2023-12-21")
        //         }
        //     },

        // })
        if (branches.length > 0) {
            return res.status(200).send({
                success: true,
                message: "get branches success",
                data: branches
            })
        }

        return res.status(404).send({
            success: false,
            message: "branches not found",
            data: []
        })

    } catch (error) {
        console.log(error)
    }
}

export const getBranchStats = async (req: Request, res: Response) => {
    try {
        const branchStats = await prisma.branch.aggregate({
            _count: {
                _all: true
            },
            _min: {
                createdAt: true
            },
            _max: {
                createdAt: true
            }
        })

        console.log(`Total Branches created : ${branchStats._count._all}`)
        console.log(`Earliest creation time : ${branchStats._min.createdAt}`)
        console.log(`Latest Branches created : ${branchStats._max.createdAt}`)

        return res.status(200).send({
            success: true,
            result: branchStats
        })
    } catch (err) {
        console.log(err)
    }
}

export const getBranchDetail = async (req: Request, res: Response) => {
    try {
        const branch = await prisma.branch.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
        })

        if (branch) {
            return res.status(200).send({
                success: true,
                message: "get branch detail success",
                data: branch
            })
        }

        return res.status(404).send({
            success: false,
            message: "branch not found",
            data: null
        })


    } catch (error) {
        console.log(error)
    }
}

export const updateBranch = async (req: Request, res: Response) => {
    try {

        const { id } = req.params

        const branch = await prisma.branch.update({
            where: {
                id: parseInt(id)
            },
            data: req.body
        });

        return res.status(201).send({
            success: true,
            message: "update branch success",
            data: branch
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteBranch = async (req: Request, res: Response) => {
    try {

        const { id } = req.params

        const branch = await prisma.branch.delete({
            where: {
                id: parseInt(id)
            },
        });

        return res.status(200).send({
            success: true,
            message: "delete branch success",
            data: branch
        })
    } catch (error) {
        console.log(error)
    }
}
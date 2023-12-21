import express, { Application, Request, Response, } from "express"
import bodyParser from "body-parser"
import { getBranch, getBranchDetail, createBranch, updateBranch, deleteBranch, getBranchStats } from "./controllers/branchController"
import userRoute from "./routes/userRoute"
import postRoute from "./routes/postRoute"

const app: Application = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)

app.get("/api/branches", getBranch)
app.get("/api/branches-stats", getBranchStats)
app.get("/api/branches/:id", getBranchDetail)
app.post("/api/branches", createBranch)
app.put("/api/branches/:id", updateBranch)
app.delete("/api/branches/:id", deleteBranch)

app.get("/api", (req: Request, res: Response) => {
    res.status(200).send({
        hello: "world"
    })
})

app.listen(3456, () => {
    console.log("API run on port ", 3456)
})
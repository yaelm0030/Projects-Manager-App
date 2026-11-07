import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import projectRoutes from "./routes/project.routes.js"
import taskRoutes from "./routes/task.routes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/tasks", taskRoutes)

// one place for all errors (validation errors, bad ids, ...)
app.use((err, req, res, next) => {
    console.error(err.message)
    const status = err.name === "ValidationError" || err.name === "CastError" ? 400 : 500
    res.status(status).json({ message: err.message })
})

export default app

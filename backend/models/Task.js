import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    status: { type: String, enum: ["To Do", "In Progress", "Done"], default: "To Do" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    deadline: { type: String } // "YYYY-MM-DD", as used by the date input
})

export default mongoose.model("Task", taskSchema)

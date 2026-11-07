// Creates the demo user (yael / 1234) and a few demo projects with tasks.
// WARNING: clears the users, projects and tasks collections first.
// Run with: docker compose run --rm backend npm run seed
import "dotenv/config"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import Project from "../models/Project.js"
import Task from "../models/Task.js"

await mongoose.connect(process.env.MONGO_URI)

await User.deleteMany()
await Project.deleteMany()
await Task.deleteMany()

await User.create({ name: "yael", password: await bcrypt.hash("1234", 10) })

const website = await Project.create({ name: "Corporate Website Redesign", description: "Modernizing the main landing page with a focus on user engagement and responsive design." })
const app = await Project.create({ name: "Mobile App Launch", description: "Preparation for the iOS and Android release, including store assets and final QA." })
const marketing = await Project.create({ name: "Marketing Campaign Q1", description: "Social media outreach and email newsletter automation for the upcoming spring sale." })

await Task.create([
    { projectId: website._id, name: "Create Wireframes", description: "Drafting the initial structure for the homepage.", status: "Done", priority: "high", deadline: "2026-03-05" },
    { projectId: website._id, name: "UI Style Guide", description: "Defining typography, color palettes, and components.", status: "In Progress", priority: "medium", deadline: "2026-03-12" },
    { projectId: app._id, name: "App Store Screenshots", description: "Capturing images for the Apple App Store and Google Play.", status: "To Do", priority: "medium", deadline: "2026-03-10" },
    { projectId: app._id, name: "Bug Fixing Phase 2", description: "Resolving critical issues found during internal testing.", status: "In Progress", priority: "high", deadline: "2026-03-01" },
    { projectId: marketing._id, name: "Copywriting for Emails", description: "Writing headlines and body text for the email series.", status: "To Do", priority: "low", deadline: "2026-03-20" },
    { projectId: marketing._id, name: "Ad Banner Design", description: "Finalizing the visual assets for the advertisements.", status: "Done", priority: "high", deadline: "2026-02-28" }
])

console.log("Seeded")
await mongoose.disconnect()

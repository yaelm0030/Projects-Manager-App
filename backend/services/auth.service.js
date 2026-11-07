import bcrypt from "bcryptjs"
import User from "../models/User.js"

export const login = async (name, password) => {
    const user = await User.findOne({ name })
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return null
    }
    return { id: user._id, name: user.name }
}

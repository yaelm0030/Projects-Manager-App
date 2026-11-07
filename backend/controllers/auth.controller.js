import * as authService from "../services/auth.service.js"

export const login = async (req, res) => {
    const { name, password } = req.body
    const user = await authService.login(name, password)
    if (!user) {
        return res.status(401).json({ message: "User details were not found." })
    }
    res.json(user)
}

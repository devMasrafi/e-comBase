export const adminAuth = async (req, res, next) => {
    try {
        if (req.user.role == "admin" && req.user.role == "editor") {
            return res.send("access denied")
        }
        next()
    } catch (error) {
        console.log("auth", error);
    }
}
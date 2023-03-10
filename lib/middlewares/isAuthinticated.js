const { verifyToken } = require("../services/tokenService")
// TODO
// Check if the user is still valid (deletedAt, deactivatedAt)
const isAuthenticated = (req, res, next) => {
    const auth = req?.headers?.authorization
    if (!auth) {
        res.status(401)
        return res.send({
            success: false,
            messages: ['Please provide a valid auth header']
        })
    }
    const token = auth.split(' ')
    const user = verifyToken(token[token.length - 1])
    if (user) {
        req.user = user
        return next()
    }
    res.status(401)
    return res.send({
        success: false,
        messages: ['You are not allowed to do so.']
    })
}

module.exports = isAuthenticated
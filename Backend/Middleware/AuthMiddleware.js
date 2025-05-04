const { asyncHandler } = require("../Utility/AscynHandler");
const { errorHandler } = require("../Utility/ErrorHandler");
const jwt = require("jsonwebtoken")

const isAuthenticate = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(new errorHandler("Invalid Token", 400));
    }
    const tokenData = jwt.verify(token, process.env.JWT_KEY)
    req.user = tokenData;
    next();
}
)
module.exports = {
    isAuthenticate,
}
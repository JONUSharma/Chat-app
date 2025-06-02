const { user } = require("../Model/User_schema");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../Utility/AscynHandler");
const { errorHandler } = require("../Utility/ErrorHandler");

const HandleSignup = asyncHandler(async (req, res, next) => {
    const { fullname, email, password, confirmpassword, gender, username } = req.body;
    if (!fullname || !email || !gender || !password || !confirmpassword || !username) {
        return next(new errorHandler("All fields are required.", 400));
    }
    const Checkemail = await user.findOne({ email });
    if (Checkemail) {
        return next(new errorHandler("email already used", 400))
    }
    const CheckUser = await user.findOne({ username });
    if (CheckUser) {
        return next(new errorHandler("user alredy exist", 400))
    }
    const AvatarType = gender === "male" ? "boy" : "girl";
    const avatar = `https://avatar.iran.liara.run/public/${AvatarType}?username= ${username}`;

    const AddUser = await user.create({ fullname, email, password, confirmpassword, gender, avatar, username })
    AddUser.password = await bcrypt.hash(password, 8);
    await AddUser.save();

    res.status(200)
        .cookie("token", AddUser, {
            expires: new Date(Date.now() + 2 * 24 * 60 * 1000),
            secure: true,
            sameSite: "None",
            httpOnly: false,
        }).json({ msg: "user added successfully", success: true, response: AddUser })
}
)

const HandleLogin = asyncHandler(
    async (req, res, next) => {

        const { username, password, email } = req.body;
        if (email === " " || username === "" || password === "") {
            return next(new errorHandler("All field required...", 400))
        }

        const Finduser = await user.findOne({ email, username })
        if (!Finduser) {
            return next(new errorHandler("Please enter a valid username and email", 400))
        }
        const checkPassword = await bcrypt.compare(password, Finduser.password)
        if (!checkPassword) {
            return next(new errorHandler("Password not matched...", 400));
        }

        const sign = jwt.sign({ email: Finduser.email, username: Finduser.username, _id: Finduser._id },
            process.env.JWT_KEY,
            { expiresIn: "4h" }
        )
        res.status(200)
            .cookie("token", sign, {
                expires: new Date(Date.now() + 2 * 24 * 60 * 1000),
                httpOnly: false,
                secure: true,
                sameSite: "None"
            })
            .json({
                msg: "Login Successfully", success: true,
                cookie: sign,
                response: {
                    Finduser
                }
            })
    })

const getProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const profile = await user.findById(userId);
    res.status(200).json({
        success: true,
        response: profile
    })
})

const Logout = asyncHandler(async (req, res, next) => {
    res.status(200)
        .cookie("token", " ", {
            expire: new Date(Date.now()),
            // httpOnly: true,
        }).json({
            success: true,
            msg: "logout successfully"
        })
})

const getOtherUser = asyncHandler(async (req, res, next) => {
    const profile = await user.find({ _id: { $ne: req.user._id } });
    res.status(200).json({
        success: true,
        response: profile
    })
})

module.exports = {
    HandleSignup,
    HandleLogin,
    getProfile,
    Logout,
    getOtherUser
}
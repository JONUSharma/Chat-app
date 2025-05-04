const express = require("express");
const route = express.Router();
const { user } = require("../Model/User_schema")
const { HandleSignup,HandleLogin, getProfile,getOtherUser, Logout } = require("../Controller/User_controller")
const {isAuthenticate} = require ("../Middleware/AuthMiddleware.js")
route.post("/", (req, res) => {
    res.json({
        msg: "success"
    })
})

route.post("/user/signup", HandleSignup)
route.post("/user/login", HandleLogin)
route.post("/user/getProfile",isAuthenticate,getProfile);
route.post("/user/getOtherUser",isAuthenticate,getOtherUser);
route.post("/user/logout",isAuthenticate,Logout);


module.exports = route
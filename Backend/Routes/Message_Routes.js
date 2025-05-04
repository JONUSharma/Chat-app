const express = require("express");
const { sendMessage, getMessages } = require("../Controller/Meassge_controller");
const {isAuthenticate} = require("../Middleware/AuthMiddleware.js");
const route = express.Router();


route.post("/send/:receiverID",isAuthenticate,sendMessage);
route.post("/receive/:receiverID",isAuthenticate,getMessages);

const MessageRoute = route
module.exports = MessageRoute
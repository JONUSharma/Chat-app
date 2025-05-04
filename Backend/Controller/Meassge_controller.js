const { asyncHandler } = require("../Utility/AscynHandler");
const { errorhandler } = require("../Utility/ErrorHandler.js")
const { Message } = require("../Model/Message_Schema.js");
const { Conversation } = require("../Model/Conversation_Schema.js");
const { get } = require("mongoose");
const { getSocketId, io } = require("../Socket/Socket")

const sendMessage = asyncHandler(async (req, res, next) => {
    const senderID = req.user._id;
    const receiverID = req.params.receiverID;
    const message = req.body.message;

    if (!senderID || !receiverID || !message) {
        return next(new errorhandler("ALl fields are required", 400));
    }

    let conversation = await Conversation.findOne({
        participants: {
            $all: [senderID, receiverID]
        }
    })

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderID, receiverID]
        })
    }

    const newMessage = await Message.create({ senderID, receiverID, message })
    if (newMessage) {
        conversation.message.push(newMessage._id);
        await conversation.save();
    }

    const socketId = getSocketId(receiverID)
    io.to(socketId).emit("message", newMessage);

    res.status(200).json({
        success: true,
        response: newMessage,
    })
})


const getMessages = asyncHandler(async (req, res, next) => {
    const senderID = req.user._id;
    const receiverID = req.params.receiverID;


    if (!senderID || !receiverID) {
        return next(new errorhandler("ALl fields are required", 400));
    }

    let conversation = await Conversation.findOne({
        participants: {
            $all: [senderID, receiverID],
        }
    }).populate("message");
    res.status(200).json({
        success: true,
        response: conversation,
    })
})



module.exports = {
    sendMessage,
    getMessages,
}
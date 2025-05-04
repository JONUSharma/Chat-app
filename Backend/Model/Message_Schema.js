const mongoose = require("mongoose")
const messageSchema = new mongoose.Schema({
    senderID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "user",
    },
    receiverID : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "user",
    },
    message : {
        type : String,
        require : true,
    }
},{
    timestamps : true,
})

const Message = mongoose.model("Message", messageSchema);
module.exports = {
    Message
}
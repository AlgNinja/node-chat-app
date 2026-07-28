import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    senderId: {
        typeof: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        typeof: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        typeof: String,
    },
    image: {
        typeof: String,
    },
    video: {
        typeof: String,
    }
}, {timestamps:true})

const Message = mongoose.model("Message", messageSchema)

export default Message
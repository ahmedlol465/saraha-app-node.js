import { Schema, model } from "mongoose";

const messageSchema = new Schema ({
    content: {
        type: String,
        require: true
    },
    sendTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    idViewed: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

const Messages = model("message", messageSchema);
export default Messages
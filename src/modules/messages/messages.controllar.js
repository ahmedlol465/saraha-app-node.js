import { findDocument } from "../../../DB/moduls/dbMethods.js";
import Messages from "../../../DB/moduls/message.model.js";
import User from "../../../DB/moduls/user.model.js";
import asyncHandeler from 'express-async-handler'

// 0000000   send message 00000000000

export const sendmessage = async (req, res, next) => {
    const { content } = req.body;
    const { sendTo } = req.params;

    const isUserExists = await findDocument(User, { _id: sendTo });
    if(!isUserExists){
        return res.status(isUserExists.status).json({message: isUserExists})
    }

    const isuserexist = await User.findById(sendTo)
    if(!isuserexist){
        return res.status(404).json({message: "not valid id"})
    }

    const createmessage = await Messages.create({content, sendTo})// mongoose 
    if(!createmessage){
        return res.status(400).json({message: "faild created"})
    }
    return res.status(201).json({message: "done", createmessage})
};



// ------------- deleete message ----------------

export const deleteMessage = async (req, res, next) => {
    const {loggInUserId, MessageId} = req.query
    const deleted = await Messages.findOneAndDelete({_id:MessageId})
    if(!deleted) {
        return res.status(400).json({message: "cannot delete message"})
    }
    return res.status(200).json({ message: " deleted message" });

}


// pppppppppppppppppp mark as read ppppppppppppppppp
export const MarkAsRead = async (req,res,next)=>{
    const { loggedInUserId, MessageId } = req.query;
        const markeMessage = await Messages.findOneAndUpdate(
            { _id: MessageId, sendTo: loggedInUserId, isViewed: false },
        { isViewed: true, $inc: { __v: 1 } },
            { new: true }
        );
        if (!markeMessage) {
            return next(new Error: "cannot viewed message", {cause: 400});  // more spacegicerror 
        }
            return res.status(200).json({ message: " marked message" , markeMessage});

}

// ===============  list user messages =================
export const listUserMessage = 
    async (req, res, next)=> {
    const { loggedInUserId, isViewed} = req.query
    const messages = await Messages
    .find({sendTo: loggedInUserId, isViewed})
    .sort({createdAt: -1}) // disending(new to old) = -1/ assending (old to new) = 1 
    if(!messages.length) {
        return res.json({message: 'false'})
    }
    return res.status(200).json({message: 'your messages'})
} 
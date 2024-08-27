import { Schema , model } from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    isconfirmed:{
        type: Boolean,
        default: false
    },
    profilePicture:String,
},{timestamps: true}) // make sorting 


const User = model('user', userSchema)

export default User











// trim: true => delete sapces between the object 
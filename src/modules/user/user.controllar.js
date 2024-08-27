import User from "../../../DB/moduls/user.model.js"
import bcrypt from 'bcryptjs'


//*************************sign up*********
export const Signup = async(req,res,next) => {
    const { username, email, password } = req.body
    // username check
    const isUsernameDuplicate = await User.findOne({username})
    if(isUsernameDuplicate){
        return res.json({message: 'username already exist', status: 400})
    }
    // email chech 
    const isEmailDuplicate = await User.findOne({email})
    if (isEmailDuplicate) {
    return res.json({ message: "email already exist", status: 400 });
    }



        // hash password
        console.log(password);
        const hashpassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);
        // salt rounds  = 9 
        console.log(hashpassword);

        const createValidUser = await User.create({ username, email, password:hashpassword })
        if(!createValidUser){
            return res.json({message: 'creatd user fail', statue: 400})
        }
    return res.json({message: 'creatd user succes', status: 200 , createValidUser})
}


// ************* sign in **************8

export const SignIn = async (req, res, next) =>{
    const { username, email, password } = req.body
    // compare username,email 
    const user =  await User.findOne({
        $or: [
            {username},
            {email}
        ]
    })
    if(!user){
        res.json({message:"invaild information", statue: 400})
    }

    // compare password
    const isPasswordMatch = bcrypt.compareSync(password, user.password)
    console.log(isPasswordMatch)
    if(!isPasswordMatch){
        return res.json({message: "invalid password or email"})
    }
    return res.json({message: 'login succefully', statue: 200})
}


// %%%%%%%%%%%%5 update profie %%%%%%%%%
// update modifycount
export const updateData = async (req,res,next)=>{
    const {username,email} = req.body
    const {_id} = req.query
    let updateObject = {}

    // username chek not exist  and return in the object the value 
    if(username){
        const isUsernameDuplicate = await User.findOne({username})
    if(isUsernameDuplicate){
        return res.json({message: 'username already exist', status: 400})
    }
    // succes situation 
    updateObject.username = username
    }


    // email chek not exist   and return in the object the value 
    if(username){
        const isEmailDuplicate = await User.findOne({username})
    if (isEmailDuplicate) {
        return res.json({ message: "email already exist", status: 400 });
    }
    // succes situation 
    updateObject.email = email
    }
    console.log(updateObject)
    const updateuser = await User.updateOne({_id},updateObject)
    if(!updateuser.modifiedCount){
        res.json({message:"Invalid update"})
    }
    res.json({ message: " updated " });
}


// &&&&&&&  delete user $$$$$$$$

export const deletUser = async (req,res,next)=> {
    const {_id, loggedInId} = req.query


    const user = await User.findOneAndDelete({
        _id: loggedInId
    })
    if(!user){
        return res.json({message:"deleted failed", status:400})
    }

    return res.json({message: "deleted succces", status: 200})
}

// ((((((((((((((((((  get user  ))))))))))))))))))
export const getUser = async(req,res,next)=>{
    const {_id} = req.params
    const user = await User.findById(_id, 'username')  // data will return from id
    if(!user){
        return res.json({message:"invalid user id", status: 400})
    }
    return res.json({message:"done", user})
}

// creat 
// inseatMany 
// inseart 
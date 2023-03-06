const User = require('../model/user')
const brcrypt= require('bcrypt');


const registerUser = async (req,res,next) => {
    try {
        const {username,password,email} = req.body;
        const usernameCheck = await User.findOne({username})
        if (usernameCheck){
            res.status(500).json({msg:'Username already used', status:false})
            return
        }
        const emailCheck = await User.findOne({email})
        if (emailCheck){
            res.status(500).json({msg:'Email already used', status:false})
            return
        }
        else{
            const hashedPassword = await brcrypt.hash(password,10)
            const user = await User.create({username,email,password:hashedPassword})
            delete user.password
            res.status(200).json({user,status:true})
        }
    } catch (error) {
        console.log(error)
    }
    
}

const loginUser = async (req,res,next) => {
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username})
        if(!user){
            res.status(500).json({msg:'Username doesnt exist', status:false})
            return
        }
        const isPasswordValid = await brcrypt.compare(password,user.password)
        if (isPasswordValid){
            delete user.password
            res.status(200).json({user,status:true})
        }
        else{
            res.status(500).json({msg:'Password is incorrect', status:false})
        }
        return
    } catch (error) {
        console.log(error)
    }
    
}

const setAvatar = async (req,res,next) => {
    try {
        const {id} = req.params;
        const {image} = req.body;
        const user = await User.findByIdAndUpdate(id,{
            isAvatarImageSet: true,
            avatarImage: image
        })
        res.status(200).json({user,status:true})
    } catch (error) {
        console.log(error)
    }
}

const getUsers = async (req,res,next) => {
    try {
        const {id} = req.params
        const users = await User.find({_id:{$ne:id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ])
        res.status(200).json({users,status:true})
    } catch (error) {
        console.log(error)
    }
    
}


module.exports = {registerUser,loginUser,setAvatar,getUsers}
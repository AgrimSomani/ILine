const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username must be provided']
    },
    email:{
        type:String,
        required:[true,'Email must be provided']
    },
    password:{
        type:String,
        required:[true,'Password must be provided']
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:""
    }
})

module.exports = mongoose.model('User',userSchema)


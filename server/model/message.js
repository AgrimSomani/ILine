const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    message:{
            type:String,
            require:true,
    },
    user:Array,
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

})

module.exports = mongoose.model('Message',messageSchema)


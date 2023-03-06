const Message = require('../model/message')
const brcrypt= require('bcrypt');


const addMessage = async (req,res,next) => {
    try {
        const {from,to,message} = req.body;
        const data = await Message.create({
            message:message,
            user:[from,to],
            sender:from
        })
        if (data){
            res.status(200).json({data, status:true})
        }
        else{
            res.status(500).json({msg:'Couldnt add message to the database', status:false})
        }
    } catch (error) {
        console.log(error)
    }
}

const getAllMessage = async (req,res,next) => {
    try {
        const {from,to} = req.body;
        const messages = await Message.find({
            user:{
                $all: [from,to]
            }
        }).sort({updatedAt:1})
        const projectedMessages = messages.map((message,index)=>{
            return{
                fromSelf: (message.sender.toString() === from ),
                message: message.message
            }
        })
        res.status(200).json({projectedMessages, status:true})
    } catch (error) {
        res.status(500).json({msg:'There was an error', status:false})
        console.log(error)
    }
}



module.exports = {addMessage,getAllMessage}
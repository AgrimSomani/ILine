const express = require('express')
const cors = require('cors')
const connectDB = require('./db/connect')
const socket = require('socket.io')

const authRoute = require('./routes/auth')
const msgRoute = require('./routes/messages')


const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/messages',msgRoute)

const connectDataBase = () => {
    connectDB(process.env.MONGO_URI)
    console.log('Data Base is connected')
}

connectDataBase()

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is listening on PORT ${process.env.PORT}`)
})

const io = socket(server,{
    cors:{
        origin:'http://localhost:3000',
        credentials:true
    }
})

global.onlineUsers = new Map();

io.on('connection',(socket)=>{
    global.chatSocket = socket;
    
    socket.on('add-user',(userId)=>{
        onlineUsers.set(userId,socket.id)
    })

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket){
            socket.to(sendUserSocket).emit("msg-received",data.message)
        }
    })
})
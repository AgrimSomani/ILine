import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import Logout from './Logout';
import ChatInput from './ChatInput';
import { sendMessageRoute,getAllMessagesRoute } from '../utils/APIRoutes';
import {v4 as uuidv4} from 'uuid';

const ChatContainer = (props) => {
    const {currentChat, currentUser,socket} = props;
    const [arrivalMessage,setarrivalMessage] = useState(null);
    const [messages,setMessages] = useState([]);
    const scrollRef = useRef();

    const handleSendMessage = async (message) =>{
        const data = await axios.post(sendMessageRoute,{
            from:currentUser._id,
            message:message,
            to:currentChat._id
        })
        socket.current.emit("send-msg",{
            from:currentUser._id,
            message:message,
            to:currentChat._id
        })
        let msg = [...messages];
        msg.push({fromSelf:true,message:message})
        setMessages(msg);
    }

    useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-received",(msg)=>{
                setarrivalMessage({fromSelf:false,message:msg})
            })
        }
    })

    useEffect(()=>{
        if(arrivalMessage){
            setMessages((prev)=>[...prev,arrivalMessage])
        }
    },[arrivalMessage])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"})
    },[messages])

    useEffect(()=>{
        const getMessages = async() => {
            const response = await axios.post(getAllMessagesRoute,{
                from:currentUser._id,
                to:currentChat._id
            })
            setMessages(response.data.projectedMessages)
        }
        getMessages()
    },[currentChat])


    return(
        <Container>
            <div className="chat-header">
                <div className="user-detail">
                    <div className="avatar">
                        <img src={currentChat.avatarImage}/>
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout/>
            </div>
            <div className="chat-messages">
                {messages.map((message,index)=>{
                    return(
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`message ${message.fromSelf? 'sended':'received'}`}>
                                <div className="content">
                                    <p>
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <ChatInput handleSendMessage={handleSendMessage}/>
        </Container>      
    )
}

const Container = styled.div`
    display:grid;
    min-height: 0px;
    grid-template-rows: 10% 80% 10%;
    .chat-header{
        padding:0.5rem 1rem;
        min-height:3rem;
        display:flex;
        justify-content:space-between;
        align-items:center;
        .user-detail{
            display:flex;
            align-items:center;
            gap:0.5rem;
            .avatar{
                img{
                    height:3rem;
                }
            }
            .username{
                color:white
            }
        }
    }
    .chat-messages{
        &::-webkit-scrollbar {
            width:0.2rem;
            &-thumb{
                background-color: #ffffff39;
                border-radius:1rem;
                width:0.1rem;

            }
        }
        padding: 0rem 1rem;
        overflow:auto;
        gap:1rem;
        .message{
            margin:1rem 0rem;
            display:flex;
            flex-direction:row;
            align-items:center;
            .content{
                max-width:40%;
                color:#d1d1d1;
                border-radius:1rem;
                overflow-wrap:break-word;
                padding:1rem;
            }
        }
        .sended{
            justify-content:flex-end;
            .content{
                background-color:#4f04ff21;
            }
        }
        .received{
            .content{
                background-color:#9900ff20;
            }
        }
    }
`
    

export default ChatContainer
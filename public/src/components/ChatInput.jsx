import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { allUserRoute } from '../utils/APIRoutes';
import axios from 'axios';
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'


const ChatInput = (props) => {

    const {handleSendMessage} = props;

    const [showEmojiPicker,setShowEmojiPicker] = useState(false)
    const [message,setMessage] = useState('')

    const handleEmojiPickerHideShow = () =>{
        setShowEmojiPicker(!showEmojiPicker)
    }

    const handleEmojiClick = (event,emoji) =>{
        setMessage(message+(emoji.emoji))

    }

    const sendChat = (event) => {
        event.preventDefault()
        if (message.length > 0){
            handleSendMessage(message)
            setMessage('')
        }
    }

    return(  
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={()=>handleEmojiPickerHideShow()}/>
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>}
                </div>
            </div>
            <form className='input-container' onSubmit={(e)=>sendChat(e)}>
                <input type='text' placeholder='Type your message here...' value={message} onChange={(e)=>setMessage(e.target.value)}/>
                <button className='submit'>
                    <IoMdSend/>
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display:grid;
    grid-template-columns: 5% 95%;
    align-items:center;
    background-color:#080420;
    padding:0.2rem;
    .button-container{
        display:flex;
        align-items:center;
        justify-content:center;
        .emoji{
            svg{
                font-size:1.5rem;
                color:#ffff00c8;
                cursor:pointer
            }
            .emoji-picker-react{
                position:absolute;
                bottom:150px;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9a86f3;
                .emoji-categories{
                    button{
                        filter:contrast(0)
                    }
                }
                .emoji-search{
                    background-color:transparent;
                    border-color: #9186f3
                }
                .emoji-group:before{
                    background-color: #080420
                }
                .emoji-scroll-wrapper::-webkit-scrollbar{
                    background-color: #080420;
                    width:5px;
                    &-thumb{
                        background-color:#9186f3;
                    }
                }
            }
        }
    }
    .input-container{
        border-radius:2rem;
        background-color: #ffffff34;
        display:flex;
        align-items:center;
        gap:2rem;
        padding:0.3rem;
        input{
            width:90%;
            height:60%;
            background-color:transparent;
            border:none;
            margin-left:0.5rem;
            color:white;
            &::selection{
                background-color:#9186f3
            }
            &:focus{
                outline:none;
            }
        }
        .submit{
            display:flex;
            justify-content:center;
            align-items:center;
            background-color: #9a86f3;
            border:none;
            border-radius:2rem;
            padding: 0.3rem 2rem;
            svg{
                color:white;
                font-size:1.5rem
            }
        }
    }
`
    

export default ChatInput
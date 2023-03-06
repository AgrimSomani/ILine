import React, { useEffect, useState,useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { allUserRoute,host } from '../utils/APIRoutes';
import axios from 'axios';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client'


const Chat = () => {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts,setContacts] = useState([]);
    const [currentUser,setCurrentUser] = useState(null);
    const [Chat,setChat] = useState(null);


    useEffect(()=>{
        const setUser = async()=>{
            if (localStorage.getItem('chat-app-user')){
                  setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')))
            }
            else{
                navigate('/login')
            }
        }
        setUser()
    },[])

    useEffect(()=>{
        if(currentUser){
            socket.current = io(host)
            socket.current.emit("add-user",currentUser._id)
        }
    })

    useEffect(()=>{
        const fetchData = async () => {
            const {data} = await axios.get(`${allUserRoute}/${currentUser._id}`)
            if(currentUser.isAvatarImageSet){
                if(data.status === true){
                   setContacts(data.users)
                }
                else{
                    console.log('Not working, try again')
                }
            }
            else{
                navigate('/setAvatar')
            }
            
        }
        fetchData()
    },[currentUser])

    const handleChatChange = (chat) => {
         setChat(chat)
    }
    
    return(
        <Container>
            <div className='container'>
                <Contacts contacts = {contacts} currentUser={currentUser} changeChat={handleChatChange}/>
                {!Chat? <Welcome currentUser={currentUser}/> :<ChatContainer currentUser={currentUser} currentChat={Chat} socket={socket}/>}
            </div>
            
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display :flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #131324;
    gap:1rem;
    .container{
        height:85vh;
        width:85vw;
        background-color: #00000076;
        display:grid;
        grid-template-columns: 25% 75%
    }
    
`

export default Chat
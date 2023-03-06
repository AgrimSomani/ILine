import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { allUserRoute } from '../utils/APIRoutes';
import axios from 'axios';
import logo from '../logo192.png'

const Contacts = (props) => {
    const {contacts, currentUser, changeChat} = props
    const [currentUserName,setCurrentUserName] = useState(null)
    const [currentUserImage,setCurrentUserImage] = useState(null)
    const [currentSelected,setCurrentSelected] = useState(null)

    useEffect(()=>{
        if(currentUser){
            setCurrentUserName(currentUser.username)
            setCurrentUserImage(currentUser.avatarImage)
        }
    },[currentUser])

    const changeCurrentChat = (index,contact) =>{
        setCurrentSelected(index)
        changeChat(contact)
    }

    return(
        <>
             {
                currentUserImage && currentUserName && 
                <Container>
                    <div className='brand'>
                        <img src={logo}  alt='logo'/>
                        <h3>ILine</h3>
                    </div>
                    <div className='contacts'>
                        {contacts.map((contact,index)=>{
                            return(
                                <div className={`contact ${currentSelected === index? 'selected':''}`}
                                    key={index}
                                    onClick={()=>{changeCurrentChat(index,contact)}}
                                >
                                    <div className='avatar'>
                                        <img
                                            src={contact.avatarImage}
                                            alt='avatar'
                                        />
                                    </div>
                                    <div className='username'>
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='currentUser'>
                        <div className='avatar'>
                            <img
                                src={currentUserImage}
                                alt='avatar'
                            />
                        </div>
                        <div className='username'>
                            <h2>{currentUserName}</h2>
                        </div>
                    </div>
                </Container>
            }
        </>         
    )
}

const Container = styled.div`
    display:grid;
    grid-template-rows :10% 75% 15%;
    overflow:hidden;
    background-color:#080420;
    .brand{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:1rem;
        img{
            height:3rem
        }
        h3{
            color:white;
            text-transform:uppercase;
        }
    }
    .contacts{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        gap:0.8rem;
        overflow:auto;
        .contact{
            min-height:5rem;
            background-color:#ffffff39;
            width:90%;
            display:flex;
            align-items:center;
            gap:1rem;
            .avatar{
                img{
                    height:3rem
                }
            }
            .username{
                h3{
                    color:white
                }
            }
            padding:0.5rem;
            cursor:pointer;
            border-radius:0.2rem;
            transition: 0.5s ease-in-out;
        }
        .selected{
            background-color:#9186f3
        }
        &::-webkit-scrollbar {
            width:0.2rem;
            &-thumb{
                background-color: #ffffff39;
                border-radius:1rem;
                width:0.1rem;

            }
        }
    }
    .currentUser{
        background-color:#0d0d30;
        display:flex;
        justify-content:center;
        align-items:center;
        .avatar{
            img{
                height:4rem;
                max-inline-size:100%
            }
        }
        .username{
            h2{
                color:white
            }
        }
        gap:1rem;

    }
`

export default Contacts
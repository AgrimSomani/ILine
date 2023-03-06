import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../logo192.png'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { setAvatarRoute} from '../utils/APIRoutes';
import { Buffer } from 'buffer';

const SetAvatar = () => {

    const avatarAPI = "https://api.multiavatar.com/45678945"
    const navigate = useNavigate();

    const [avatars,setAvatars] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [selectedAvatar,setSelectedAvatar] = useState(null);

    useEffect(()=>{
        function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
              result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
           }
           return result;
        }
        const data = []
        const fetchData = () =>{
            const gender = ['male','female']
            for(let i=0;i<4;i++){
                const source = `https://avatars.dicebear.com/api/${gender[Math.round(Math.random())]}/${makeid(10)}.svg`;
                data.push(source)
            }
        }
        if(isLoading){
            fetchData()
            setAvatars(data)
            setIsLoading(false)
        }
    })

    useEffect(()=>{
        if(!localStorage.getItem('chat-app-user')){
            navigate('/login')
        }
    })

    const setProfilePicture = async () => {
        if (!selectedAvatar){
            return
        }
        else{
            const user = await JSON.parse(localStorage.getItem("chat-app-user"))
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image:avatars[selectedAvatar]
            })
            if(data.status === true){
                user.isAvatarImageSet = true;
                user.avatarImage = avatars[selectedAvatar]
                localStorage.setItem("chat-app-user",JSON.stringify(user))
                navigate('/')
            }
            else{
                console.log('Error, Please try again')
            }
        }

    }

    return(
        <>
            <Container>
                <div className='title-container'>
                    <h1>Pick an Avatar as your profile picture</h1>
                </div>
                <div className='avatars'>
                    {
                        avatars.map((avatar,index)=>{
                            return(
                                <div key={index} className={`avatar ${selectedAvatar === index? "selected" :""}`}>
                                    <img src={avatar} alt='avatar' onClick={()=>setSelectedAvatar(index)}/>
                                </div>
                            )
                        })
                    }
                </div>
                <button className='submit-button' onClick={(event)=>setProfilePicture()}>Set as Profile Picture</button>
            </Container>
            <ToastContainer/>
        </>
    )
}

const Container = styled.div `
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    gap:3rem;
    background-color:#131324;
    .title-container{
        h1{
            color:white
        }
    }
    .avatars{
        display:flex;
        gap:1rem;
        justify-content:center;
        align-items:center;
        .avatar{
            border: 0.4rem solid transparent;
            img{
                height:6rem;
            }
            border-radius:5rem;
            display:flex;
            justify-content:center;
            align-items:center;
            transition:0.5s ease-in-out;
            padding:1rem;
            cursor:pointer;
        }
        .selected{
            border: 0.4rem solid #4e0eff;
        }
    }
    .submit-button{
        background-color: #997af0;
        padding: 1rem 2rem;
        border:none;
        color:white;
        font-weight:bold;
        cursor:pointer;
        text-transform : uppercase;
        &:hover {
            background-color: #4e0eff
        }
        transition: 0.5s ease-in-out;
        border-radius:0.5rem
    }
`;

export default SetAvatar

/*<div className='avatars'>
                    {
                        avatars.map((avatar,index)=>{
                            return(
                                <div key={index} className={`avatar ${selectedAvatar === index? "selected" :""}`}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt='avatar' onClick={()=>setSelectedAvatar(index)}/>
                                </div>
                            )
                        })
                    }
                     useEffect( ()=>{
        const data = []
        const fetchData = async () =>{
            for (let i =0; i<4;i++){
                const image = await axios.get(`${avatarAPI}/${Math.round(Math.random() * 1000)}`)
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"))
            }
        }
        fetchData()
        setAvatars(data)
        setIsLoading(false)
    })
                </div>*/
import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../logo192.png'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes';

const Register = () => {

    const toastOptions = {
        position:'bottom-right',
        autoClose:5000,
        draggable:true,
        theme:'dark',
        pauseOnHover : true
    }

    const navigate = useNavigate();

    const [values,setValues] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
    })

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(handleValidation()){
            const {password,confirmPassword,username,email} = values;
            const {data} = await axios.post(registerRoute,{
                username,email,password
            })
            if(data.status === false){
                toast.error(data.msg,toastOptions)
                return
            }
            navigate('/login') 
        }
    }

    const handleValidation = () => {
        const {password,confirmPassword,username,email} = values;

        if (password !== confirmPassword){
            toast.error("Password is not the same as Confirm Password",toastOptions)
            return false
        }
        else if (email === ''){
           
            toast.error("Please provide an Email",toastOptions)
            return false
        }
        else if (username.length <= 3){
            
            toast.error("Username has to be greater than 3 characters",toastOptions)
            return false
        }
        else if (password.length <= 3){
           
            toast.error("Password has to be greater than 3 characters",toastOptions)
            return false
        }
        return true
    }

    const handleChange = (event) => {
        setValues({...values,[event.target.name]:event.target.value})
    }



    return(
        <FormContainer>
            <form onSubmit={(event)=>handleSubmit(event)} className='form'>
                <div className='brand'>
                    <img src={Logo} alt="Logo" />
                    <h1>ILine</h1>
                </div>
                <input
                type='text'
                placeholder='Username'
                name = 'username'
                onChange={(e)=>handleChange(e)}
                />
                <input
                    type='email'
                    placeholder='Email'
                    name = 'email'
                    onChange={(e)=>handleChange(e)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    name = 'password'
                    onChange={(e)=>handleChange(e)}
                />
                <input
                    type='password'
                    placeholder='Confirm Password'
                    name = 'confirmPassword'
                    onChange={(e)=>handleChange(e)}
                />
                <button type='submit'>Create User</button>
                <span>Already have an account ? <Link to='/login'> Login</Link></span>
            </form>
        </FormContainer>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display :flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #131324;
    .form {
        display :flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        background-color : #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            padding: 1rem;
            width: 100%;
            background-color: transparent;
            border-radius: 0.5rem;
            border: 0.1rem solid #4e0eff;
            color:white;
            &:focus {
                border: 0.1rem solid #997af0;
                outline: none
            }
        }
        button{
            background-color: #997af0;
            padding: 1rem 2rem;
            width:100%;
            border:none;
            color:white;
            font-weight:bold;
            cursor:pointer;
            text-transform : uppercase;
            &:hover {
                background-color: #4e0eff
            }
            transition: 0.5s ease-in-out;
        }
        span{
            color:white;
            text-transform: uppercase;
            a{
                text-decoration:none;
                color:#4e0eff;
            }
        }
    }
    .brand{
        display:flex;
        flex-direction: row;
        justify-content:center;
        align-items: center;
        width: 100%;
        h1{
            color: white;
            text-transform: uppercase;
        }
        img{
            height: 3rem;
            margin-right: 0.5rem
        }
    }
`;


export default Register
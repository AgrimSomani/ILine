import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { allUserRoute } from '../utils/APIRoutes';
import axios from 'axios';
import logo from '../logo192.png'

const Welcome = (props) => {
    const {currentUser} = props;
    return(
        <Container>
            <img src={logo}/>
            {currentUser && <h1>Welcome <span>{currentUser.username}</span></h1>}
            <h3>Please select a chat to start messaging</h3>
        </Container>      
    )
}

const Container = styled.div`
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    h3,h1{
        color:white
    }
    span{
        color:#4e0eff
    }
    gap:0.5rem
`
    

export default Welcome
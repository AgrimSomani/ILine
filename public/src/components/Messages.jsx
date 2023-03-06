import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { allUserRoute } from '../utils/APIRoutes';
import axios from 'axios';
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'


const Messages = (props) => {
    return(  
        <Container>
            <div>Messages</div>
        </Container>
    )
}

const Container = styled.div`
    height:80%;
`
    

export default Messages
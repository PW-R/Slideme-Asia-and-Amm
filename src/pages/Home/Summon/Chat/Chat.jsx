import { useState, useEffect, useRef } from "react";
import { Link,Outlet} from 'react-router-dom';

import './Chat.css'

function Chat() {
    return ( 

        <div className='chat-container'>

            <div className="title">
                <Link 
                    to='/summon'
                    onClick={() => setTab('summon')}>
                    <i className="bi bi-caret-left-fill"></i>
                </Link>
                <h1>Chat with Driver</h1>
            </div>      


        </div>
     );
}

export default Chat;
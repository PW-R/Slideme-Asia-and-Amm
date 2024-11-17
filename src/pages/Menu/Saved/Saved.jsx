import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

import './Saved.css'

const initPage = "home";

const data = {
    progress: null, // หรือ []
};

function Saved({data}) {

    if (!Array.isArray(data) || data.length === 0 ) {
        return <p>ไม่มีข้อมูล</p>; // แสดงข้อความเมื่อ data ไม่ใช่อาร์เรย์
    }
    
    // const [tab, setTab] = useState(initPage);

    return ( 

        <div className="container">

            {data.map((item) => (

                <div className='saved-tab' key={item.id}>

                    <div className='s-profile-driver'>
                        <div className="p-circle-image"></div>
                        <i class="bi bi-bookmark-fill"></i>
                    </div>

                    <div className='detail'>
                        <h1>{item.title}</h1>
                        <p>{item.date}</p>
                        <p>฿{item.price.toLocaleString()}</p>
                    </div>

                    <div className='book-again'>
                        <Link 
                            to="/home/call"
                            onClick={() => setTab('/call')}>
                            <p>{item.status}</p>
                        </Link>
                    </div>
                    
                </div>

            ))}
        </div>
     );
}

export default Saved;
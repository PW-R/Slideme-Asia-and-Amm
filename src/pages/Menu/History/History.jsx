import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

import './History.css'

const initPage = "home";

const data = {
    progress: null, // หรือ []
};

function History({data}) {

    // const [tab, setTab] = useState(initPage);

    if (!Array.isArray(data) || data.length === 0 ) {
        return <p>ไม่มีข้อมูล</p>; // แสดงข้อความเมื่อ data ไม่ใช่อาร์เรย์
    }

    return ( 
        <div className="container">

            {data.map((item) => (

                <div className='history-tab' key={item.id}>

                    <div className='profile-driver'>
                        <div className="circle-image"></div>
                        <i class="bi bi-check-circle-fill"></i>
                    </div>

                    <div className='detail'>
                        <h1>{item.title}</h1>
                        <p>{item.date}</p>
                        <p>฿{item.price.toLocaleString()}</p>
                    </div>

                    <div className='book-again'>
                        <Link 
                            to='/call'
                            onClick={() => setTab('call')}>
                            <p>{item.status}</p>
                        </Link>
                    </div>
                    
                </div>
            ))}

        </div>

     );
}

export default History;
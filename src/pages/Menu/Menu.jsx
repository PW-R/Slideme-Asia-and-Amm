import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import MenuList from "./MenuList/MenuList";
import { Outlet } from 'react-router';
import './Menu.css'

import Progress from "./Progress/Progress";
import Saved from "./Saved/Saved";
import History from "./History/History";

const initPage = "progress";
const initData = {
    progress_history : [
        { id: 1, title: "ร้าน A", date: "01/11/2024", price: 1500, status: "กำลังดำเนินการ" },
        { id: 2, title: "ร้าน B", date: "15/11/2024", price: 2000, status: "Book Again" },
        { id: 3, title: "ร้าน C", date: "14/11/2024", price: 1800, status: "Book Again" },
    ],

    saved: [
        { id: 1, title: "ร้าน AA", date: "01/11/2024", price: 1500, status: "Book Again" },
        { id: 2, title: "ร้าน BB", date: "02/11/2024", price: 2000, status: "Book Again" },
    ],

    // history: [
    //     { id: 1, title: "ร้าน AAA", date: "10/11/2024", price: 1510, status: "Book Again" },
    //     { id: 2, title: "ร้าน BBB", date: "25/11/2024", price: 2500, status: "Book Again" },
    // ],
};

function Menu() {

    const [tab, setTab] = useState(initPage);
    const [data] = useState(initData);

    const updateStatus = (id, newStatus) => {
        // อัปเดตสถานะของรายการที่ตรงกับ id
        setData(prevData => ({
            ...prevData,
            progress_history: prevData.progress_history.map(item =>
                item.id === id ? { ...item, status: newStatus } : item
            ),
        }));
    };

    // updateStatus(1, "เสร็จสิ้น");

    

    return ( 
        <div className="menu-container">

            <div className="title">
                <i className="bi bi-caret-left-fill"></i>
                <h1>รายการ</h1>
            </div>

            <div className='menu-list-container'>
                <ul className="nav nav-underline">

                    <li className="nav-item" >
                        <Link 
                            to='/menu/progress' 
                            className={`nav-link ${tab === 'progress' ? 'unactive' : ''}`} 
                            onClick={() => setTab('progress')}>
                            กำลังดำเนินการ
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link 
                            to='/menu/saved' 
                            className={`nav-link ${tab === 'saved' ? 'unactive' : ''}`} 
                            onClick={() => setTab('saved')}>
                            ที่บันทึกไว้
                        </Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link 
                            to='/menu/history' 
                            className={`nav-link ${tab === 'history' ? 'unactive' : ''}`} 
                            onClick={() => setTab('history')}>
                            ประวัติ
                        </Link>
                    </li>

                </ul>    
            </div>

            <div className="outlett-container">
                {tab === "progress" && <Progress data={data.progress_history.filter(item => item.status === "กำลังดำเนินการ")} />}
                {tab === "saved" && <Saved data={data.saved} />}
                {tab === "history" && <History data={data.progress_history.filter(item => item.status === "Book Again")} />}
            </div>

        </div>
     );
}

export default Menu;
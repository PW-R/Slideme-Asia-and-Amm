import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

import './MenuList.css'

const initPage = "menulist";

function MenuList(  ) {

    const [tab, setTab] = useState('');
    
    const progressRef = useRef()
    const savedRef = useRef()
    const historyRef = useRef()
    
    useEffect(() => {
        setTab(initPage);
    }, []);

    useEffect(() => {
        // if (tab === 'progress') progressRef.current?.click();
        if (tab === 'saved') savedRef.current?.click();
        else if (tab === 'history') historyRef.current?.click();
        else progressRef.current?.click();
    }, [tab]);

    return ( 
        <div className='menu-list-container'>

            {/* ลิ้งเนฟบาร์ ทำให้เปิดได้ในหน้าเดิม ไม่ต้องเปิดแทบใหม่*/}

            

                <Link to='/progress'>
                    <button 
                        className={'btn ' + (tab === 'progress' ?  'btn-primary' :
                        'btn-outline-primary')}
                        onClick={() => setTab('progress')}>กำลังดำเนินการ
                    </button>
                </Link>

                <Link to='/saved'>
                    <button 
                        className={'btn ' + (tab === 'saved' ?  'btn-primary' :
                        'btn-outline-primary')}
                        onClick={() => setTab('saved')}>ที่บันทึกไว้
                    </button>
                </Link>

                <Link to='/history'>
                    <button 
                        className={'btn ' + (tab === 'history' ?  'btn-primary' :
                        'btn-outline-primary')}
                        onClick={() => setTab('history')}>ประวัติ
                    </button>
                </Link>

            
        </div>
     );
}

export default MenuList;
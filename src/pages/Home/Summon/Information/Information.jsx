import { useEffect} from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './Information.css'

function Information({ currentLocation, priceDetails, serviceInfo, ...props }) {
    const navigate = useNavigate();
    const location = useLocation();

    const { selectedOffer } = location.state || {};
    if (!selectedOffer) {
        return <p>ข้อมูลไม่พร้อม</p>;  
    }

    useEffect(() => {
        if (selectedOffer) {
            sessionStorage.setItem('selectedOffer', JSON.stringify(selectedOffer));
        }
    }, [selectedOffer]);
    
    return (
        <div className='information-container'>
            <div className="title">
                <Link 
                    to='/summon'
                    onClick={() => setTab('summon')}>
                    <i class="bi bi-chevron-left"></i>
                </Link>
                <h1>ข้อมูลผู้ให้บริการ</h1>
            </div>

            {/* profile */}
            <div className='information-profile-driver'>
                <div className="driver-image">
                    <img src="driver.png"/>
                </div>

                <div className='information-name-driver'>
                    <h2>{selectedOffer?.name}</h2>
                    <p>{selectedOffer?.driverId || "ไม่ระบุ"}</p>
                </div>
            </div>

            {/* rate */}
            <div className='information-number-container'>
                <div className="information-number">
                    <h2>{selectedOffer?.ordersCompleted}</h2>
                    <p>Order</p>
                </div>

                <div  className="information-number">
                    <h2>{selectedOffer?.reviewScore}</h2>
                    <p>Service</p>
                </div>

                <div className="information-number">
                    <h2>{selectedOffer?.startedYear}</h2>
                    <p>Year</p>
                </div>
            </div>

            {/* line */}
            <hr className="line-information" />

            {/* detail */}
            <div className='information-3-detail'>
                <p>
                    <i class="bi bi-file-earmark-person"></i>
                    {selectedOffer?.name} &nbsp; {selectedOffer?.driverId}
                </p>
                <p onClick={() => window.location.href = 'tel:+0682538888'}>
                    <i class="bi bi-telephone"></i>
                    {selectedOffer?.phoneNumber}
                </p>
                <p>
                    <i class="bi bi-geo-alt"></i>
                    {selectedOffer?.workplace}
                </p>
            </div>

            {/* review  */}
            <div className='information-review-container'>
                <div className="information-review">
                    <p>ตรงต่อเวลา</p>
                    <p>{selectedOffer?.punctualityScore}</p>
                </div>
                <div className="information-review">
                    <p>ราคาเป็นธรรม</p>
                    <p>{selectedOffer?.fairPriceScore}</p>
                </div>
                <div className="information-review">
                    <p>ปลอดภัย</p>
                    <p>{selectedOffer?.safetyScore}</p>
                </div>
                <div className="information-review">
                    <p>บุคลิคผู้ขับ</p>
                    <p>{selectedOffer?.personalityScore}</p>
                </div>
            </div>
        </div>
     );
}

export default Information;
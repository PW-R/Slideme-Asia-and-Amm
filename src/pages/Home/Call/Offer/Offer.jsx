import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchDriverforUser } from "../../../../data/DriverforUser";

import "./Offer.css";

function Offer() {
    const [tab, setTab] = useState("offer");                
    const [offers, setOffers] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    // ดึงข้อมูลข้อเสนอ
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const drivers = await fetchDriverforUser(); 
                setOffers(drivers);
            } catch (err) {
                console.error("Error fetching offers:", err);
                setError("ไม่สามารถโหลดข้อเสนอได้"); 
            } finally {
                setLoading(false); 
            }
        };

        fetchOffers();
    }, []);

    // ฟังก์ชันเลือกข้อเสนอ
    const handleSelectOffer = (offer) => {
        console.log("Selected Offer:", offer);
        navigate("/call/details", { state: { selectedOffer: offer } });
    };

    return (
        <div className="offer-container">
            {loading ? (
                <p>Loading offers...</p> 
            ) : error ? (
                <p>{error}</p> 
            ) : offers.length === 0 ? (
                <p>ไม่มีข้อเสนอในขณะนี้</p> 
            ) : (
                offers.map((offer) => (
                    <div className="offer-tab" key={offer.id}>
                        <div className="offer-profile-driver">
                            <i className="bi bi-bookmark-fill"></i>
                            <img src="driver.png" alt="โปรไฟล์คนขับ" />
                        </div>
                        <div className="offer-detail">
                            <h1>{offer.workplace}</h1>
                            <p>{offer.serviceDate}</p>
                        </div>
                        <div className="offer-choose">
                            <p>฿{offer.servicePrice}</p>
                            <button
                                className="btn btn-success"
                                onClick={() => handleSelectOffer(offer)}>
                                เลือก
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Offer;

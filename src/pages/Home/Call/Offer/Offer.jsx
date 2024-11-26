import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { fetchDriverforUser } from "../../../../data/DriverforUser";
import "./Offer.css";

function Offer() {
    const [tab, setTab] = useState("offer");                
    const [offers, setOffers] = useState([]); // เก็บข้อมูลข้อเสนอ
    const [loading, setLoading] = useState(true); // สถานะการโหลดข้อมูล
    const [error, setError] = useState(null); // สถานะข้อผิดพลาด
    const navigate = useNavigate();

    // ดึงข้อมูลข้อเสนอ
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const drivers = await fetchDriverforUser(); // เรียก API
                setOffers(drivers);
            } catch (err) {
                console.error("Error fetching offers:", err);
                setError("ไม่สามารถโหลดข้อเสนอได้"); // กำหนดข้อความข้อผิดพลาด
            } finally {
                setLoading(false); // หยุดการแสดงสถานะโหลด
            }
        };

        fetchOffers();
    }, []);

    // ฟังก์ชันเลือกข้อเสนอ
    const handleSelectOffer = (offer) => {
        console.log("Selected Offer:", offer);
        navigate("/call/details", { state: { selectedOffer: offer } });
    };

    // navigate("/call/details", { state: { selectedOffer: offer } });


    return (
        <div className="offer-container">
            {loading ? (
                <p>Loading offers...</p> // แสดงข้อความโหลดข้อมูล
            ) : error ? (
                <p>{error}</p> // แสดงข้อความข้อผิดพลาด
            ) : offers.length === 0 ? (
                <p>ไม่มีข้อเสนอในขณะนี้</p> // แสดงเมื่อไม่มีข้อเสนอ
            ) : (
                offers.map((offer) => (
                    <div className="offer-tab" key={offer.id}>
                        <div className="offer-profile-driver">
                            <i className="bi bi-bookmark-fill"></i>
                            <div className="p-circle-image"></div>
                        </div>
                        <div className="offer-detail">
                            <h1>{offer.workplace}</h1>
                            <p>{offer.serviceDate}</p>
                        </div>
                        <div className="offer-choose">
                            <p>฿{offer.servicePrice}</p>
                            <Button
                                variant="success"
                                onClick={() => handleSelectOffer(offer)}
                            >
                                เลือก
                            </Button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Offer;

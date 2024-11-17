import './Progress.css'

const data = {
    progress: null, // หรือ []
};

function Progress({data}) {

    if (!Array.isArray(data) || data.length === 0 ) {
        return <p>ไม่มีข้อมูล</p>; // แสดงข้อความเมื่อ data ไม่ใช่อาร์เรย์
    }

    return ( 

        <div className="container">

            {data.map((item) => (

                <div className='progress-tab' key={item.id}>

                    <div className='profile-driver'>
                        <i class="bi bi-geo-alt-fill"></i>
                        <div className="p-circle-image"></div>
                    </div>

                    <div className='detail'>
                        <h1>{item.title}</h1>
                        <p>{item.date}</p>
                        <p>฿{item.price.toLocaleString()}</p>
                    </div>

                    <div className='in_progress'>
                        <p>{item.status}</p>
                    </div>
                    
                </div>

            ))}

        </div>
     );
}

export default Progress;
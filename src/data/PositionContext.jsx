import { createContext, useContext, useState } from "react";

// สร้าง Context สำหรับตำแหน่ง
const PositionContext = createContext();
const RouteInfoContext = createContext();
const CreatedPosition = createContext();  
const DriverContext = createContext();  
const MapCallbackContext = createContext();

// Hook เพื่อเข้าถึง Context
export const usePosition = () => useContext(PositionContext);
export const useRouteInfo = () => useContext(RouteInfoContext); // เพิ่มการ export useRouteInfo
export const useMapCallback = () => useContext(MapCallbackContext);
export const usehomePagePosition = () => {
    const { homePagePosition, setHomePagePosition } = useContext(PositionContext);
    return { homePagePosition, setHomePagePosition };
};
export const useCreatedPosition = () => {
    const { createdPosition, setCreatedPosition } = useContext(PositionContext); // แก้เป็น PositionContext
    return { createdPosition, setCreatedPosition };
};
export const useDriver = () => useContext(DriverContext);

// Provider สำหรับจัดการตำแหน่งต้นทางและปลายทาง
export const PositionProvider = ({ children }) => {
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [routeInfo, setRouteInfo] = useState({ distance: null, time: null }); // เพิ่ม state สำหรับข้อมูลเส้นทาง
    
    const [homePagePosition, setHomePagePosition] = useState(null);
    const [homePageOrigin, setHomePageOrigin] = useState({ position: null, address: null });
    const [homePageDestination, setHomePageDestination] = useState({ position: null, address: null });
    
    const [createdPosition, setCreatedPosition] = useState([]); 
    const [createdOrigin, setCreatedOrigin] = useState({ position: null, address: null });
    const [createdDestination, setCreatedDestination] = useState({ position: null, address: null });
    
    const [selectedDriver, setSelectedDriver] = useState(null);

    const [callback, setCallback] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [saveCallback, setSaveCallback] = useState(null); // เพิ่ม state สำหรับ saveCallback

    return (
        <PositionContext.Provider value={{
            origin, setOrigin, 
            destination, setDestination, 
            routeInfo, setRouteInfo,

            homePagePosition, setHomePagePosition,
            homePageOrigin, setHomePageOrigin,
            homePageDestination, setHomePageDestination,
            
            createdPosition, setCreatedPosition,
            createdOrigin, setCreatedOrigin,
            createdDestination, setCreatedDestination,
            currentPosition, setCurrentPosition,
            callback, setCallback,
            saveCallback, setSaveCallback
        }}>
            <RouteInfoContext.Provider value={{ routeInfo, setRouteInfo }}>
                <DriverContext.Provider value={{ selectedDriver, setSelectedDriver,}}>
                    <MapCallbackContext.Provider value={{ callback, setCallback, currentPosition, setCurrentPosition }}>
                        {children}
                    </MapCallbackContext.Provider>
                </DriverContext.Provider>
            </RouteInfoContext.Provider>
        </PositionContext.Provider>
    );
};

PositionContext.js 



// import { createContext, useContext, useState } from "react";

// const PositionContext = createContext();

// export const PositionProvider = ({ children }) => {
//   const [origin, setOrigin] = useState(null);
//   const [destination, setDestination] = useState(null);
//   const [routeInfo, setRouteInfo] = useState(null);
//   const [createdPosition, setCreatedPosition] = useState([]); // เพิ่ม state สำหรับตำแหน่งที่สร้าง

//   return (
//     <PositionContext.Provider
//       value={{
//         origin,
//         setOrigin,
//         destination,
//         setDestination,
//         routeInfo,
//         setRouteInfo,
//         createdPosition,
//         setCreatedPosition, // ส่งออก setCreatedPosition ด้วย
//       }}
//     >
//       {children}
//     </PositionContext.Provider>
//   );
// };

// // ฟังก์ชันสำหรับเข้าถึง Context
// export const usePosition = () => useContext(PositionContext);
// export const useRouteInfo = () => {
//   const { routeInfo, setRouteInfo } = useContext(PositionContext);
//   return { routeInfo, setRouteInfo };
// };
// export const useCreatedPosition = () => {
//   const { createdPosition, setCreatedPosition } = useContext(PositionContext);
//   return { createdPosition, setCreatedPosition };
// };



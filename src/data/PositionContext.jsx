import { createContext, useContext, useState } from "react";

// สร้าง Context สำหรับตำแหน่ง
const PositionContext = createContext();
const RouteInfoContext = createContext();
const CreatedPosition = createContext();    

// Hook เพื่อเข้าถึง Context
export const usePosition = () => useContext(PositionContext);
export const useRouteInfo = () => useContext(RouteInfoContext); // เพิ่มการ export useRouteInfo
export const useCreatedPosition = () => useContext(CreatedPosition);        

// Provider สำหรับจัดการตำแหน่งต้นทางและปลายทาง
export const PositionProvider = ({ children }) => {
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [routeInfo, setRouteInfo] = useState({ distance: null, time: null }); // เพิ่ม state สำหรับข้อมูลเส้นทาง
    const [createdPosition, setCreatedPosition] = useState([]); 

    return (
        <PositionContext.Provider value={{ origin, setOrigin, destination, setDestination, routeInfo, setRouteInfo }}>
            <RouteInfoContext.Provider value={{ routeInfo, setRouteInfo }}>
                <CreatedPosition.Provider value ={{ createdPosition, setCreatedPosition }}>
                    {children}
                </CreatedPosition.Provider>
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



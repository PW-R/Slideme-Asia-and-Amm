import { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
// import MapView from 'react-native-maps';
// import { AppRegistry } from 'react-native-web';
// import { View, Text } from 'react-native-web';

import Layout from "./layouts/Layout/Layout";

// import { Outlet } from 'react-router';

import Menu from "./pages/Menu/Menu";
import Progress from "./pages/Menu/Progress/Progress";
import Saved from "./pages/Menu/Saved/Saved";
import History from "./pages/Menu/History/History";

import Call from "./pages/Home/Call/Call";
// import Home from "./pages/Home/Call/Call";
import Details from "./pages/Home/Offcanvas/Details/Details";
import Offer from "./pages/Home/Offcanvas/Offer/Offer";
import Search from "./pages/Home/Search/Search";
import MapPage from "./pages/Home/Search/MapPage/MapPage";

import Summon from "./pages/Home/Summon/Summon";
import Information from "./pages/Home/Summon/Information/Information";
import Chat from "./pages/Home/Summon/Chat/Chat";
// import Call from "./pages/Home/Summon/Call/Call";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import './App.css'

const initPage = "menu";

function App() {

  const [tab, setTab] = useState('');

  useEffect(() => {
    setTab(initPage)
  }, [])

  return (
    // <IphoneX>

    <div className='body-container'>

      <div className="app-container">
      <HashRouter>
          <Routes>
            <Route element={<Layout tab={tab} setTab={setTab} />}>
              {/* เส้นทางหลัก */}
              <Route path="/search" element={<Search tab={tab} setTab={setTab} />} />
              <Route path="/map" element={<MapPage />} />

              {/* เส้นทางหลักสำหรับ /home/call */}
              <Route path="/home/call" element={<Call tab={tab} setTab={setTab} />}>
                <Route path="offcanvas/details" element={<Details />} />
                <Route path="offcanvas/offer" element={<Offer />} />
              </Route>

              {/* เส้นทางอื่นๆ */}
              <Route path="summon" element={<Summon />} />
              <Route path="information" element={<Information />} />
              <Route path="chat" element={<Chat />} />

              {/* เมนู */}
              <Route path="/menu" element={<Menu />}>
                <Route index element={<Progress />} />
                <Route path="progress" element={<Progress />} />
                <Route path="saved" element={<Saved />} />
                <Route path="history" element={<History />} />
              </Route>
            </Route>
          </Routes>
        </HashRouter>
      </div>



    </div>
    // </IphoneX>
  )
}

export default App

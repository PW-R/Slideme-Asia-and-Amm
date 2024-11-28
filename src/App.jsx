import { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout/Layout";

import "@fontsource/ibm-plex-sans"; 
import "@fontsource/ibm-plex-sans/400.css"; 
import "@fontsource/ibm-plex-sans/700.css"; 

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import './App.css'

// Menu
import Menu from "./pages/Menu/Menu";
import Progress from "./pages/Menu/Progress/Progress";
import Saved from "./pages/Menu/Saved/Saved";
import History from "./pages/Menu/History/History";

// Home
import HomePage from "./pages/Home/HomePage/HomePage";
import Map_HomePage from "./pages/Home/HomePage/Map_HomePage/Map_HomePage";

// Search page
import Search from "./pages/Home/Search/Search";
import MapPage from "./pages/Home/Search/MapPage/MapPage";

// Call page
import Call from "./pages/Home/Call/Call";
import Details from "./pages/Home/Call/Details/Details";
import Offer from "./pages/Home/Call/Offer/Offer";

// Summon page
import Summon from "./pages/Home/Summon/Summon";
import Information from "./pages/Home/Summon/Information/Information";
import Chat from "./pages/Home/Summon/Chat/Chat";

// Tracking page
import Tracking from "./pages/Home/Tracking/Tracking";

// User 
import Created_Position from "./pages/User/Created_Position/Created_Position";
import Map_Created_Position from "./pages/User/Created_Position/Map-Created_Position/Map_Created_Position";    

import { PositionProvider } from "./data/PositionContext";

const initPage = "menu";

function App() {
  const [tab, setTab] = useState('');

  useEffect(() => {
    setTab(initPage)
  }, [])

  return (
    <PositionProvider>
      <div className='body-container'>
        <div className="app-container">
        <HashRouter>
            <Routes>
                < Route element={<Layout tab={tab} setTab={setTab} />}>
                
                    {/* เส้นทางหลัก */}
                    <Route path="/" element={<Search tab={tab} setTab={setTab} />} />
                
                    {/* Menu */}
                    <Route path="/menu" element={<Menu />}>
                      <Route index element={<Progress />} />
                      <Route path="progress" element={<Progress />} />
                      <Route path="saved" element={<Saved />} />
                      <Route path="history" element={<History />} />
                    </Route>

                    {/* Home Routes */}
                    <Route path="/search" element={<Search />} />
                    <Route path="/map" element={<MapPage />} /> {/* No Navbar here */}
                    <Route  path="homepage" element={<HomePage />} />
                    <Route path="/map_homepage" element={<Map_HomePage />} />

                    {/* Call page */}
                    <Route path="/call" element={<Call />}>
                      <Route path="offer" element={<Offer />} />
                      <Route path="details" element={<Details />} />
                    </Route>

                    {/* Summon page */}
                    <Route path="summon" element={<Summon />} />
                    <Route path="information" element={<Information />} />
                    <Route path="chat" element={<Chat />} />

                    {/* Tracking page */}
                    <Route path="tracking" element={<Tracking />} />

                    {/* User */}
                    {/* < Route path="/user" element={<Created_Position />}> */}
                          <Route path="created_position" element={<Created_Position />} />
                          <Route path="/map_created_position" element={<Map_Created_Position />} />     
                    {/* </Route> */}
              </Route>
            </Routes>
          </HashRouter>
        </div>
      </div>
    </PositionProvider>
  )
}

export default App

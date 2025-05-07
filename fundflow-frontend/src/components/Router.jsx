import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import About from "./About";
import Reg from "./Reg";
import Fund1 from "./Fund1";
import Donation from "./Donation";
import Contact from "./Contact";
import Profile from "./Profile";
import Browser from "./Browser";
import News from "./News";
import Career from "./Career";
import Dashboard from "./Dashboard";
import Screen from "./Screen";
import Team from "./Team";
import How from "./How";
import Pay from "./Pay";
import Wig from "./Wig";
// import Feedback from "./Feedback";
// import {Footer} from "./Footer";

import { CgIndieHackers } from "react-icons/cg";
import Feed from "./Feed";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Reg" element={<Reg />} />
          <Route exact path="/Contact" element={<Contact />} />
          <Route exact path="/Dashboard" element={<Dashboard/>} />
          <Route exact path="/Feed" element={<Feed/>} />
          <Route exact path="/Fund1" element={<Fund1/>} />
          <Route exact path="/campaign/:id" element={<Screen/>} />
          <Route exact path="/How" element={<How/>} />
          <Route exact path="/Profile" element={<Profile/>} />
          <Route exact path="/News" element={<News/>} />
          <Route exact path="/Browser" element={<Browser/>} />
          <Route exact path="/Career" element={<Career/>} />
          <Route exact path="/Donation" element={<Donation/>} />
          <Route exact path="/Pay" element={<Pay/>} />
          <Route exact path="/Wig" element={<Wig/>} />
          <Route exact path="/Team" element={<Team/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}



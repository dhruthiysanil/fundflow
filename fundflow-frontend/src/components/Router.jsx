import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import About from "./About";
import Reg from "./Reg";
import New from "./New";
import Fund from "./Fund";
import Bene from "./Bene";
import Myself from "./Myself";
import Contact from "./Contact";
import Profile from "./Profile";
import Browser from "./Browser";
import News from "./News";
import Career from "./Career";
import Relative from "./Relative";
import X from "./X";
import Friend from "./Friend";
import Other from "./Other";
import FamilyG from "./FamilyG";
import Team from "./Team";
import { CgIndieHackers } from "react-icons/cg";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Reg" element={<Reg />} />
          <Route exact path="/Contact" element={<Contact />} />
          <Route exact path="/New" element={<New/>} />
          <Route exact path="/Fund" element={<Fund/>} />
          <Route exact path="/Bene" element={<Bene/>} />
          <Route exact path="/Myself" element={<Myself/>} />
          <Route exact path="/Profile" element={<Profile/>} />
          <Route exact path="/News" element={<News/>} />
          <Route exact path="/Browser" element={<Browser/>} />
          <Route exact path="/Career" element={<Career/>} />
          <Route exact path="/Relative" element={<Relative/>} />
          <Route exact path="/X" element={<X/>} />
          <Route exact path="/Friend" element={<Friend/>} />
          <Route exact path="/Other" element={<Other/>} />
          <Route exact path="/FamilyG" element={<FamilyG/>} />
          <Route exact path="/Team" element={<Team/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}



import NavigationBar from './Components/NavigationBar.jsx';
import SignInPopUP from './Components/SignInPopUp.jsx';
import { getAPI } from "./js/utils/APIcoms.js";
import { setCookie, getCookie} from"./js/utils/cookies.js";
import { BASE_URL, JWT_REFRESH_INTERVALS } from "./config.js";
import { parseJwt } from "./js/utils/userHelper.js";

import { useState, useRef, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Providers from './Components/Providers/Providers.jsx';
import Confirm from './Components/general/Confirm.jsx';
import Contacts from './Components/hamburger-menu/contacts/Contacts.jsx';
import FAQ from './Components/hamburger-menu/faq/FAQ.jsx';
import AboutUs from './Components/hamburger-menu/about-us/AboutUs.jsx';


///////////  APP ///////////////////////////////////////////////

function App() {

  return (
    <Providers>
      {/* <SignInPopUP></SignInPopUP> */}
      <NavigationBar></NavigationBar>
      <Confirm></Confirm>

      <Routes>
        <Route path="/" element={<div>Yoga Website Home - Updated</div>} />

        {/* Classes Routes */}
        <Route path="/tvarkaratis" element={<div>Tvarkaraštis</div>} />
        <Route path="/kainos" element={<div>Kainos</div>} />
        <Route path="/uzsakyti-vieta" element={<div>Užsakyti vietą</div>} />

        {/* Discover Routes */}
        <Route path="/ramubes-kampelis" element={<div>Ramybės kampelis</div>} />
        <Route path="/pozos" element={<div>Pozos</div>} />
        <Route path="/zaidimai" element={<div>Žaidimai</div>} />
        <Route path="/mini-srautai" element={<div>Mini srautai (istorijos)</div>} />

        {/* Hamburger Menu Routes */}
        <Route path="/apie-mus" element={<AboutUs />} />
        <Route path="/duk" element={<FAQ />} />
        <Route path="/kontaktai" element={<Contacts />} />

      </Routes>
    </Providers>
    
  )
}

export default App;


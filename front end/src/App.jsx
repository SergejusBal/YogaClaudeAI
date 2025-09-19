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


///////////  APP ///////////////////////////////////////////////

function App() {

  return (
    <Providers>
      {/* <SignInPopUP></SignInPopUP> */}
      <NavigationBar></NavigationBar>
      <Confirm></Confirm>

      <Routes>
        <Route path="/" element={<div>Yoga Website Home - Updated</div>} />

        <Route path="/meal_calculator" element={<div>Meal Calculator</div>} />
        <Route path="/tdee_calculator" element={<div>TDEE Calculator</div>} />
        <Route path="/bmi_calculator" element={<div>BMI Calculator</div>} />
        <Route path="/bodyfat_calculator" element={<div>Body Fat Calculator</div>} />
        <Route path="/calorie_burn" element={<div>Calorie Burn Calculator</div>} />
        <Route path="/sleep_calculator" element={<div>Sleep Calculator</div>} />

        <Route path="/recipe" element={<div>Recipes</div>} />
        <Route path="/products" element={<div>Products</div>} />

        <Route path="/aboutus" element={<div>About Us</div>} />

        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/admin" element={<div>Admin</div>} />

      </Routes>
    </Providers>
    
  )
}

export default App;


import styles from "./NavigationBar.module.css";
import { Link } from "react-router-dom";
import { deleteCookie } from "../js/utils/cookies";

import { useAuth } from "./Providers/AuthProvider";
import { useSignIn } from "./Providers/SignInProvider";

////////////////////////////////// Component ////////////////////////////////////

function NavigationBar() {
  const { user, setUser } = useAuth();
  const { showSignIn } = useSignIn();
    
  function handleOpenSignIn() {
    if(user.role === "GUEST"){
        showSignIn();
    } else {
      setUser({userUUID:"Guest", role: "GUEST"});
        deleteCookie("JWToken");
        deleteCookie("username");
    }   
    
  }
  
  return (       
    <div className={styles["nav-div"]}>
      <nav className={styles["nav-left"]}>
        <ul>
          <li><Link to="/">Pagrindinis</Link></li>
          <li>
            <span >Skaičiuoklės</span>
            <ul>
              <li><Link to="/meal_calculator">Kalorijų ir mitybos planuoklė</Link></li>   
              <li><Link to="/tdee_calculator">TDEE (Dienos kalorijų suvartojimas)</Link></li>                    
              <li><Link to="/bmi_calculator">KMI (Kūno masės indeksas)</Link></li>                      
              <li><Link to="/bodyfat_calculator">Kūno riebalų kiekio (%) skaičiuoklė</Link></li>  
              <li><Link to="/calorie_burn">Sudegintų kalorijų skaičiuoklė</Link></li>  
              <li><Link to="/sleep_calculator">Miego skaičiuoklė</Link></li>  
            </ul>
          </li>

          <li className={styles["show-recommend"]}>
            <span>Rekomenduojame</span>
            <ul>
              <li><Link to="/recipe">Dienos receptai</Link></li>
              <li><Link to="/products">Produktai</Link></li>
              <li><Link to="/recommendation">Rekomenduojame</Link></li> 
            </ul>
          </li> 
          <li className={styles["show-about"]}><Link to="/aboutus">Apie mane</Link></li>    
        </ul>
      </nav>

      <nav className={styles["nav-right"]}>
        <ul style={{ justifyContent: "flex-end" }}>
          <li className={styles["hamburger-menu"]}>
            <span style={{ fontWeight: "bold" }}>☰</span>
            <ul>
              <li onClick={() => handleOpenSignIn()}>
                <span >{user.role === "GUEST" ? "Prisijungti" : "Atsijungti"}</span>
              </li>                 
              <li className={styles["hide-recipe"]}>
                <Link to="/recipe">Dienos receptai</Link>
              </li>         
              <li className={styles["hide-producs"]}>
                <Link to="/products">Rekomenduojami produktai</Link>
              </li>            
              <li style={(user.role === "ADMIN" || user.role === "REGULAR") ? { display: "flex" } : { display: "none" }}>
                <Link to="/profile">Profilis</Link>
              </li>          
              <li style={user.role === "ADMIN" ? { display: "flex" } : { display: "none" }}>
                <Link to="/admin">Administratorius</Link>
              </li>                    
              <li>
              <a href="#"  >
                Pagalbos centras
              </a>
              </li>
              <li className={styles["hide-about"]}>
                <Link to="/aboutus">Apie mane</Link>
              </li> 
            </ul>
          </li>                
        </ul>            
      </nav>
    </div>
  );
}

export default NavigationBar;

//////////////////////////////////////////////////////////////////////////////////////
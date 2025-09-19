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
            <span>Užsiėmimai</span>
            <ul>
              <li><Link to="/tvarkaratis">Tvarkaraštis</Link></li>
              <li><Link to="/kainos">Kainos</Link></li>
              <li><Link to="/uzsakyti-vieta">Užsakyti vietą</Link></li>
            </ul>
          </li>

          <li className={styles["show-recommend"]}>
            <span>Atraskite</span>
            <ul>
              <li><Link to="/ramubes-kampelis">Ramybės kampelis</Link></li>
              <li><Link to="/pozos">Pozos</Link></li>
              <li><Link to="/zaidimai">Žaidimai</Link></li>
              <li><Link to="/mini-srautai">Mini srautai (istorijos)</Link></li>
            </ul>
          </li>
        </ul>
      </nav>

      <nav className={styles["nav-right"]}>
        <ul style={{ justifyContent: "flex-end" }}>
          <li className={styles["hamburger-menu"]}>
            <span style={{ fontWeight: "bold" }}>☰</span>
            <ul>
              <li className={styles["hide-uzsiemimai"]}>
                <Link to="/tvarkaratis">Tvarkaraštis</Link>
              </li>
              <li className={styles["hide-uzsiemimai"]}>
                <Link to="/kainos">Kainos</Link>
              </li>
              <li className={styles["hide-uzsiemimai"]}>
                <Link to="/uzsakyti-vieta">Užsakyti vietą</Link>
              </li>
              <li className={styles["hide-atraskite"]}>
                <Link to="/ramubes-kampelis">Ramybės kampelis</Link>
              </li>
              <li className={styles["hide-atraskite"]}>
                <Link to="/pozos">Pozos</Link>
              </li>
              <li className={styles["hide-atraskite"]}>
                <Link to="/zaidimai">Žaidimai</Link>
              </li>
              <li className={styles["hide-atraskite"]}>
                <Link to="/mini-srautai">Mini srautai (istorijos)</Link>
              </li>
              <li><Link to="/apie-mus">Apie mus</Link></li>
              <li><Link to="/duk">DUK</Link></li>
              <li><Link to="/kontaktai">Kontaktai</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavigationBar;

//////////////////////////////////////////////////////////////////////////////////////
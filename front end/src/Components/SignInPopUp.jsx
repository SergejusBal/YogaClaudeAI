import { useState } from "react";
import styles from "./SignInPopUp.module.css"; 
import { BASE_URL } from "../config";
import { postAPI } from "../js/utils/APIcoms";
import { parseJwt, checkIfUserInfoValid } from "../js/utils/userHelper";
import { setCookie, getCookie } from "../js/utils/cookies";
import { Link } from "react-router-dom";


import { useAuth } from "./Providers/AuthProvider";
import { useSignIn } from "./Providers/SignInProvider";


////////////// Component //////////////////////////////

function SignInPopUP() {

  const { user, setUser } = useAuth();                 
  const { isVisible, hideSignIn, showSignIn} = useSignIn();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [signInMessage, setSignInMessage] = useState('');

  const signInData = {
    user,
    setUser,
    username,
    setUsername,
    password,
    setPassword,
    signInMessage,
    setSignInMessage,   
    hideSignIn,
    showSignIn
  }; 

  if(!isVisible) return null;

  return (
    <div className={styles['popup']}>
      <div className={styles['popup-content']}>
        <span className={styles['close-popup-button']} onClick={() => handleOnClose( setSignInMessage, signInData)}>
          &times;
        </span>
        <h1>Prisijungimas</h1>
        
        <form>
         
            <label htmlFor="username">Vartotojo vardas:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="vartotojo vardas"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />          
      
            <label htmlFor="password">Slaptažodis:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="slaptažodis"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        
          <button type="button" onClick={() => handleSignIn( signInData )}>Prisijungti</button>
          <button type="button" onClick={() => handleRegister( signInData )}>Registruotis</button>

          <Link to="#"> Pamiršau slaptažodį</Link>
        
        </form>

        {signInMessage && (<p>{signInMessage}</p>)}

      </div>
    </div>
  );
}

export default SignInPopUP;

//////////////////////////////////////////////////////////////////////

async function handleSignIn( signInData ) {

  let jwToken = getCookie("JWToken"); 

  const userJson = JSON.stringify({
    "username": signInData.username,
    "password": signInData.password
  });

  let response = await postAPI(BASE_URL + "/guest/login", userJson , jwToken);

    if (response && response.ok) {       
      const textData = await response.text();

      setCookie("JWToken",textData,1); 
      setCookie("username",signInData.username,1); 

      signInData.setUsername("");
      signInData.setPassword("");

      let claims = parseJwt(textData);
      signInData.setUser({
        userUUID: claims.userUUID,
        role: claims.role
      });

      signInData.hideSignIn();  
          
    } else {
        console.error("Response:", response ? response.status : "No response");
        signInData.setSignInMessage("Neteisingas vartotojo vardas arba slaptažodis!");
        signInData.setPassword("");         
    }
  
}

////////////////////

async function handleRegister( signInData ) {

  if (!checkIfUserInfoValid(signInData.username, signInData.password)){
    signInData.setSignInMessage("Netinkamas vartotojo vardas arba slaptažodis per silpnas.");
    return;
  } 

  let jwToken = getCookie("JWToken"); 
  const userJson = JSON.stringify({
    "username": signInData.username,
    "password": signInData.password
  });

  let response = await postAPI(BASE_URL + "/guest/register", userJson , jwToken);

  if(response && response.status == 409){
    signInData.setSignInMessage('Vartotojas jau egzistuoja!');
    return;   
  }
  else if (response && response.ok) {  
    handleSignIn(signInData);
    return;
  } else {
    console.error("Response:", response ? response.status : "No response");
    signInData.setSignInMessage("Connection error!");   
    return;
  }   
  

}

////////////////////

function handleOnClose( setSignInMessage, signInData ) {
  signInData.hideSignIn();  
  setSignInMessage("")

}
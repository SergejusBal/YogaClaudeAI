import { createContext, useContext, useState, useEffect } from "react";
import { getCookie, setCookie } from "../../js/utils/cookies";
import { BASE_URL, JWT_REFRESH_INTERVALS } from "../../config";
import { parseJwt } from "../../js/utils/userHelper";
import { getAPI } from "../../js/utils/APIcoms";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ userUUID: "Guest", role: "GUEST" });

  useEffect(() => {
    let refresh;
    async function initAuth() {
      await refreshJWTCookies(user, setUser);
      refresh = setInterval(() => {
        refreshJWTCookies(user, setUser);
      }, JWT_REFRESH_INTERVALS);
    }

    initAuth();
    return () => clearInterval(refresh);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}




////////////////////////////////////////////////////////

async function refreshJWTCookies(user, setUser) {
  const jwToken = getCookie("JWToken");
  const response = await getAPI(BASE_URL + "/noFilter/refresh", jwToken);

  if (response && response.ok) {
    const textData = await response.text();
    setCookie("JWToken", textData, 1);

    const claim = parseJwt(textData);
    if (claim.userUUID !== user.userUUID) {
      setUser({ userUUID: claim.userUUID, role: claim.role });
    }
  } else {
    console.error("Response:", response ? response.status : "No response");
  }
}

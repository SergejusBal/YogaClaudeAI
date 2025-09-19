
export function parseJwt(token) {
    if (!token) return;
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  
    return JSON.parse(jsonPayload); 
  }


  function checkRole() {
    const role = getRole();

    if (!role) {
        console.error("No valid role found.");
        return false;
    }

    const allowedRoles = ["ADMIN", "REGULAR"];
    return allowedRoles.includes(role);
}

 export function getRole() {
    let jwToken = getCookie("jwToken");

    if (!jwToken) {
        console.error("No JWT token found.");
        return null;
    }

    try {
        const claims = parseJwt(jwToken);
        return claims.role || null;
    } catch (error) {
        console.error("JWT parse error:", error);
        return null;
    }
}

export function getUserUUID() {

    let jwToken = getCookie("jwToken");

    if (!jwToken) {
        console.error("No JWT token found.");
        return null;
    }

    try {
        const claims = parseJwt(jwToken);
        return claims.userUUID || null;
    } catch (error) {
        console.error("JWT parse error:", error);
        return null;
    }
}


export function checkIfUserInfoValid(username, password){    

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
        return false; 
    }

    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return false; 
    }

    return true;
}
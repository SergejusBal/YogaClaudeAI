import { createContext, useContext, useState } from "react";

const SignInContext = createContext();

export function SignInProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  const showSignIn = () => setIsVisible(true);
  const hideSignIn = () => setIsVisible(false);

  return (
    <SignInContext.Provider value={{ isVisible, showSignIn, hideSignIn }}>
      {children}
    </SignInContext.Provider>
  );
}

export function useSignIn() {
  return useContext(SignInContext);
}
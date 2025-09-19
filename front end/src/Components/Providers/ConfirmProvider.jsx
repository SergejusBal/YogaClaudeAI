// ConfirmProvider.jsx
import { createContext, useContext, useState } from "react";

const ConfirmContext = createContext();

export function ConfirmProvider({ children }) {

  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [resolver, setResolver] = useState(null);

  const showConfirm = (msg) => {
    setMessage(msg);
    setIsVisible(true);
                                                      //    function A(resolve) {
    return new Promise((resolve) => {                 //        function B() {
      setResolver(() => resolve);                     //            return resolve;
    });                                               //            }
  };                                                  //        setResolver(B);
                                                      //        }

  const handleConfirm = () => {
    if (resolver) resolver(true);
    reset();
  };

  const handleCancel = () => {
    if (resolver) resolver(false);
    reset();
  };

  const reset = () => {
    setIsVisible(false);
    setMessage("");
    setResolver(null);
  };

  return (
    <ConfirmContext.Provider value={{ isVisible, message, showConfirm, handleConfirm, handleCancel }}>
      {children}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmContext);
}

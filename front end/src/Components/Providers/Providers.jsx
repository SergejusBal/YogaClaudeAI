import { AuthProvider } from "./AuthProvider";
import { SignInProvider } from "./SignInProvider";
import { ConfirmProvider } from "./ConfirmProvider";


export default function Providers({ children }) {
  return ( 
    <AuthProvider>
        <SignInProvider>
          <ConfirmProvider>
              {children}  
          </ConfirmProvider>            
        </SignInProvider>        
    </AuthProvider> 
  );
}
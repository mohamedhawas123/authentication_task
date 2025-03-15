import { createContext, useState, ReactNode } from "react";
import CryptoJS from "crypto-js";

// Secret key for encryption (should be stored securely)
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "fall-back-secretKey";

interface AuthContextType {
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
}

//create context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

//create provide
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  //  encrypt token for securty
  const encryptToken = (token: string) => {
    return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
  };

  //  decrypt token
  const decryptToken = (encryptedToken: string | null) => {
    if (!encryptedToken) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8) || null;
    } catch (error) {
      console.error("Error decrypting token:", error);
      return null;
    }
  };

  // Load encrypt token from localStorage and decrypt it
  const [token, setToken] = useState<string | null>(
    decryptToken(localStorage.getItem("token"))
  );

  // Save encrypted token to localStorage on login
  const login = (newToken: string) => {
    const encryptedToken = encryptToken(newToken);
    setToken(newToken);
    localStorage.setItem("token", encryptedToken);
  };

  // remove token from localStorage on logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

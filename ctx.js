import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.API_URL || " https://humbly-mighty-buck.ngrok-free.app ";

import { useContext, createContext } from "react";
import { useStorageState } from "./useStorageState";

const AuthContext = createContext({
  signIn: async () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// Hook para acceder a la sesión
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const signIn = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setSession(data.token); // Guarda el token en el almacenamiento
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const signOut = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

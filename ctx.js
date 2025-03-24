import Constants from "expo-constants";
import { useContext, createContext } from "react";
import { useStorageState } from "./useStorageState";

const API_URL = Constants.expoConfig.extra.API_URL || "https://humbly-mighty-buck.ngrok-free.app";

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

  const signIn = async (username, password) => {
    try {
      // Verifica si el nombre de usuario y la contraseña son correctos
      if (username === "enrique" && password === "123") {
        // Simula un token de autenticación
        const fakeToken = "fake-token-123456";
        setSession(fakeToken); // Guarda el token en el almacenamiento
      } else {
        throw new Error("Invalid username or password");
      }
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
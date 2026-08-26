import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  function login(tokenRecebido) {
    localStorage.setItem("token", tokenRecebido);
    setToken(tokenRecebido);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  const autenticado = Boolean(token);

  return (
    <AuthContext.Provider
      value={{
        token,
        autenticado,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
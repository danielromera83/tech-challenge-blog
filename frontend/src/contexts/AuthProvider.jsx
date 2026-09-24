import { useEffect, useState } from "react";

import { AuthContext } from "./auth";
import {
  buscarSessao,
  login as loginApi,
  logout as logoutApi,
} from "../services/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function verificarSessao() {
      try {
        const data = await buscarSessao();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setCarregando(false);
      }
    }

    verificarSessao();
  }, []);

  async function login(email, password) {
    const data = await loginApi(email, password);
    setUser(data.user);

    return data.user;
  }

  async function logout() {
    try {
      await logoutApi();
    } finally {
      setUser(null);
    }
  }

  const autenticado = Boolean(user);
  const professor = user?.role === "PROFESSOR";

  return (
    <AuthContext.Provider
      value={{
        user,
        autenticado,
        professor,
        carregando,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

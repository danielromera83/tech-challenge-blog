import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/auth";

function ProtectedRoute({ children }) {
  const {
    autenticado,
    professor,
    carregando,
  } = useAuth();

  if (carregando) {
    return (
      <main className="form-page">
        <p>Verificando sessão...</p>
      </main>
    );
  }

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  if (!professor) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

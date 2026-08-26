import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

function ProtectedRoute({ children }) {
  const { autenticado } = useAuth();

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
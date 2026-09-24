import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/auth";

function Header() {
  const {
    autenticado,
    professor,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  async function handleLogout() {
  navigate("/");

  try {
    await logout();
  } catch {
    // O AuthProvider limpa o estado local mesmo se a API estiver indisponível.
  }
}

  return (
    <header>
      <nav>
        <Link to="/">Blog Tech Challenge</Link>

        <div>
          <Link to="/">Posts</Link>

          {professor && (
            <>
              <Link to="/posts/novo">Novo Post</Link>
              <Link to="/admin">Administração</Link>
            </>
          )}

          {autenticado ? (
            <button type="button" onClick={handleLogout}>
              Sair
            </button>
          ) : (
            <Link to="/login">Login do Professor</Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;

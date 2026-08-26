import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/auth";

function Header() {
  const { autenticado, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header>
      <nav>
        <Link to="/">Blog Tech Challenge</Link>

        <div>
          <Link to="/">Posts</Link>

          {autenticado ? (
            <>
              <Link to="/posts/novo">Novo Post</Link>
              <Link to="/admin">Administração</Link>

              <button type="button" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <Link to="/login">Login do Professor</Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
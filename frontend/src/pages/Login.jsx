import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  function handleSubmit(event) {
    event.preventDefault();

    if (email === "professor@fiap.com.br" && senha === "fiap2026") {
      login("techchallenge2026");
      navigate("/admin");
      return;
    }

    setErro("E-mail ou senha inválidos.");
  }

  return (
    <main>
      <h1>Login do Professor</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />
        </div>

        {erro && <p>{erro}</p>}

        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}

export default Login;
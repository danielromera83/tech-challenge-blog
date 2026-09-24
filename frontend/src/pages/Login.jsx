import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const navigate = useNavigate();
  const { login, logout } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();

    setErro("");
    setEnviando(true);

    try {
      const user = await login(email, senha);

      if (user.role !== "PROFESSOR") {
        await logout();
        setErro("Acesso permitido apenas para professores.");
        return;
      }

      navigate("/admin");
    } catch (error) {
      setErro(error.message || "Não foi possível realizar o login.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="form-page">
      <div className="form-page__intro">
        <span className="section-heading__eyebrow">
          Área do professor
        </span>

        <h1>Acesse sua conta</h1>

        <p>
          Faça login para criar, editar e administrar
          as publicações do blog.
        </p>
      </div>

      <section className="form-card">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">E-mail</label>

            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="senha">Senha</label>

            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {erro && (
            <p className="form-error" role="alert">
              {erro}
            </p>
          )}

          <button type="submit" disabled={enviando}>
            {enviando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <Link className="form-card__back" to="/">
          ← Voltar para os posts
        </Link>
      </section>
    </main>
  );
}

export default Login;

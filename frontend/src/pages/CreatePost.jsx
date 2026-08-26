import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { criarPost } from "../services/api";

function CreatePost() {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [autor, setAutor] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSalvando(true);
      setErro("");

      await criarPost({
        titulo,
        conteudo,
        autor,
      });

      navigate("/");
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main className="form-page">
      <div className="form-page__intro">
        <span className="section-heading__eyebrow">
          Nova publicação
        </span>

        <h1>Criar Novo Post</h1>

        <p>
          Publique um novo conteúdo para os alunos
          diretamente pelo painel do professor.
        </p>
      </div>

      <section className="form-card">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="titulo">Título</label>

            <input
              id="titulo"
              type="text"
              placeholder="Digite o título do post"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="autor">Autor</label>

            <input
              id="autor"
              type="text"
              placeholder="Nome do autor"
              value={autor}
              onChange={(event) => setAutor(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="conteudo">Conteúdo</label>

            <textarea
              id="conteudo"
              placeholder="Escreva o conteúdo da publicação..."
              value={conteudo}
              onChange={(event) => setConteudo(event.target.value)}
              rows="10"
              required
            />
          </div>

          {erro && (
            <p className="form-error" role="alert">
              {erro}
            </p>
          )}

          <div className="form-actions">
            <button type="submit" disabled={salvando}>
              {salvando ? "Publicando..." : "Publicar Post"}
            </button>

            <Link to="/admin">
              Cancelar
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default CreatePost;
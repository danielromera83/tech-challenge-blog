import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { buscarPost, editarPost } from "../services/api";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [autor, setAutor] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
  async function carregarPost() {
    try {
      setCarregando(true);
      setErro("");

      const post = await buscarPost(id);

      setTitulo(post.titulo);
      setConteudo(post.conteudo);
      setAutor(post.autor);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  carregarPost();
}, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSalvando(true);
      setErro("");

      await editarPost(id, {
        titulo,
        conteudo,
        autor,
      });

      navigate(`/posts/${id}`);
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <main>
        <p className="status-message">
          Carregando post...
        </p>
      </main>
    );
  }

  return (
    <main className="form-page">
      <div className="form-page__intro">
        <span className="section-heading__eyebrow">
          Edição
        </span>

        <h1>Editar Post</h1>

        <p>
          Atualize as informações da publicação e
          salve as alterações.
        </p>
      </div>

      <section className="form-card">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="titulo">Título</label>

            <input
              id="titulo"
              type="text"
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
              value={autor}
              onChange={(event) => setAutor(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="conteudo">Conteúdo</label>

            <textarea
              id="conteudo"
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
              {salvando ? "Salvando..." : "Salvar Alterações"}
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

export default EditPost;
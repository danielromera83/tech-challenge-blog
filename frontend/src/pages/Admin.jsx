import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { listarPosts, excluirPost } from "../services/api";

function Admin() {
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
  async function carregarPosts() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await listarPosts();
      setPosts(dados);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  carregarPosts();
}, []);

  async function handleExcluir(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este post?"
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro("");

      await excluirPost(id);

      setPosts((postsAtuais) =>
        postsAtuais.filter((post) => post.id !== id)
      );
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <main>
      <section className="admin-header">
        <div>
          <span className="section-heading__eyebrow">
            Painel do professor
          </span>

          <h1>Administração</h1>

          <p>
            Gerencie as publicações disponíveis para os alunos.
          </p>
        </div>

        <Link
          className="button-link"
          to="/posts/novo"
        >
          + Criar Novo Post
        </Link>
      </section>

      <section className="admin-section">
        <div className="section-heading">
          <div>
            <span className="section-heading__eyebrow">
              Conteúdos
            </span>

            <h2>Posts publicados</h2>
          </div>

          {!carregando && !erro && (
            <span className="posts-count">
              {posts.length}{" "}
              {posts.length === 1 ? "post" : "posts"}
            </span>
          )}
        </div>

        {carregando && (
          <p className="status-message">
            Carregando posts...
          </p>
        )}

        {erro && (
          <p
            className="status-message status-message--error"
            role="alert"
          >
            {erro}
          </p>
        )}

        {!carregando &&
          !erro &&
          posts.length === 0 && (
            <p className="status-message">
              Nenhum post cadastrado.
            </p>
          )}

        {!carregando &&
          !erro &&
          posts.length > 0 && (
            <div className="admin-list">
              {posts.map((post) => (
                <article
                  className="admin-post"
                  key={post.id}
                >
                  <div className="admin-post__content">
                    <span className="admin-post__author">
                      {post.autor}
                    </span>

                    <h2>{post.titulo}</h2>
                  </div>

                  <div className="admin-post__actions">
                    <Link
                      className="admin-action"
                      to={`/posts/${post.id}`}
                    >
                      Visualizar
                    </Link>

                    <Link
                      className="admin-action"
                      to={`/posts/${post.id}/editar`}
                    >
                      Editar
                    </Link>

                    <button
                      className="button-danger"
                      type="button"
                      onClick={() =>
                        handleExcluir(post.id)
                      }
                    >
                      Excluir
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
      </section>
    </main>
  );
}

export default Admin;
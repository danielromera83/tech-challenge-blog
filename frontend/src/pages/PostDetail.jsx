import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { buscarPost } from "../services/api";

function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
  async function carregarPost() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await buscarPost(id);
      setPost(dados);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  carregarPost();
}, [id]);

  if (carregando) {
    return (
      <main>
        <p className="status-message">
          Carregando post...
        </p>
      </main>
    );
  }

  if (erro) {
    return (
      <main>
        <p
          className="status-message status-message--error"
          role="alert"
        >
          {erro}
        </p>

        <Link to="/">
          ← Voltar para os posts
        </Link>
      </main>
    );
  }

  const dataPublicacao = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("pt-BR")
    : "";

  return (
    <main className="post-detail">
      <Link
        className="post-detail__back"
        to="/"
      >
        ← Voltar para os posts
      </Link>

      <article className="post-detail__article">
        <header className="post-detail__header">
          <span className="section-heading__eyebrow">
            Publicação
          </span>

          <h1>{post.titulo}</h1>

          <div className="post-detail__meta">
            <span>
              <strong>Autor:</strong> {post.autor}
            </span>

            {dataPublicacao && (
              <span>
                <strong>Publicado em:</strong> {dataPublicacao}
              </span>
            )}
          </div>
        </header>

        <div className="post-detail__content">
          <p>{post.conteudo}</p>
        </div>
      </article>
    </main>
  );
}

export default PostDetail;
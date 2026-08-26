import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { listarPosts, excluirPost } from "../services/api";

function Admin() {
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarPosts();
  }, []);

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
      <h1>Administração</h1>

      <p>Gerencie os posts publicados no blog.</p>

      <Link to="/posts/novo">
        Criar Novo Post
      </Link>

      {carregando && <p>Carregando posts...</p>}

      {erro && <p>{erro}</p>}

      {!carregando && !erro && posts.length === 0 && (
        <p>Nenhum post cadastrado.</p>
      )}

      {!carregando &&
        posts.map((post) => (
          <article key={post.id}>
            <h2>{post.titulo}</h2>

            <p>
              <strong>Autor:</strong> {post.autor}
            </p>

            <Link to={`/posts/${post.id}`}>
              Visualizar
            </Link>

            {" | "}

            <Link to={`/posts/${post.id}/editar`}>
              Editar
            </Link>

            {" | "}

            <button
              type="button"
              onClick={() => handleExcluir(post.id)}
            >
              Excluir
            </button>
          </article>
        ))}
    </main>
  );
}

export default Admin;
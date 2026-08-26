import { useEffect, useState } from "react";

import PostCard from "../components/PostCard";
import {
  listarPosts,
  buscarPostsPorTermo,
} from "../services/api";

function Home() {
  const [posts, setPosts] = useState([]);
  const [termo, setTermo] = useState("");
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

  async function handleSearch(event) {
    event.preventDefault();

    try {
      setCarregando(true);
      setErro("");

      if (!termo.trim()) {
        await carregarPosts();
        return;
      }

      const dados = await buscarPostsPorTermo(termo);
      setPosts(dados);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main>
      <section className="hero">
        <span className="hero__tag">
          Tech Challenge • Full Stack
        </span>

        <h1>Conteúdo que conecta conhecimento e tecnologia.</h1>

        <p>
          Explore os conteúdos publicados pelos professores
          e encontre rapidamente os assuntos que procura.
        </p>

        <form
          className="search-form"
          onSubmit={handleSearch}
        >
          <label
            className="sr-only"
            htmlFor="busca"
          >
            Pesquisar posts
          </label>

          <input
            id="busca"
            type="search"
            placeholder="Pesquisar por título, conteúdo ou autor..."
            value={termo}
            onChange={(event) =>
              setTermo(event.target.value)
            }
          />

          <button type="submit">
            Pesquisar
          </button>
        </form>
      </section>

      <section className="posts-section">
        <div className="section-heading">
          <div>
            <span className="section-heading__eyebrow">
              Publicações
            </span>

            <h2>Posts recentes</h2>
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
              Nenhum post encontrado.
            </p>
          )}

        {!carregando &&
          !erro &&
          posts.length > 0 && (
            <div className="posts-grid">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                />
              ))}
            </div>
          )}
      </section>
    </main>
  );
}

export default Home;
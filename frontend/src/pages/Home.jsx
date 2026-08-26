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
      <h1>Blog Tech Challenge</h1>

      <p>Conteúdos publicados pelos professores.</p>

      <form onSubmit={handleSearch}>
        <label htmlFor="busca">Pesquisar posts</label>

        <input
          id="busca"
          type="search"
          placeholder="Digite uma palavra-chave"
          value={termo}
          onChange={(event) => setTermo(event.target.value)}
        />

        <button type="submit">
          Pesquisar
        </button>
      </form>

      {carregando && <p>Carregando posts...</p>}

      {erro && <p>{erro}</p>}

      {!carregando && !erro && posts.length === 0 && (
        <p>Nenhum post encontrado.</p>
      )}

      {!carregando &&
        !erro &&
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))}
    </main>
  );
}

export default Home;
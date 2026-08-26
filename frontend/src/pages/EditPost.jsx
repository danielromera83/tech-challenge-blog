import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    carregarPost();
  }, [id]);

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
        <p>Carregando post...</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Editar Post</h1>

      {erro && <p>{erro}</p>}

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

        <button type="submit" disabled={salvando}>
          {salvando ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </main>
  );
}

export default EditPost;
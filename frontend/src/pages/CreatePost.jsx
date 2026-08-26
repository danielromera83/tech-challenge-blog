import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <main>
      <h1>Criar Novo Post</h1>

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

        {erro && <p>{erro}</p>}

        <button type="submit" disabled={salvando}>
          {salvando ? "Publicando..." : "Publicar Post"}
        </button>
      </form>
    </main>
  );
}

export default CreatePost;
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { buscarPost } from "../services/api";

function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarPost();
  }, [id]);

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

  if (carregando) {
    return (
      <main>
        <p>Carregando post...</p>
      </main>
    );
  }

  if (erro) {
    return (
      <main>
        <p>{erro}</p>
        <Link to="/">Voltar para os posts</Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/">← Voltar para os posts</Link>

      <article>
        <h1>{post.titulo}</h1>

        <p>
          <strong>Autor:</strong> {post.autor}
        </p>

        <p>{post.conteudo}</p>
      </article>
    </main>
  );
}

export default PostDetail;
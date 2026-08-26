import { Link } from "react-router-dom";

function PostCard({ post }) {
  const descricao =
    post.conteudo.length > 150
      ? `${post.conteudo.substring(0, 150)}...`
      : post.conteudo;

  return (
    <article>
      <h2>{post.titulo}</h2>

      <p>
        <strong>Autor:</strong> {post.autor}
      </p>

      <p>{descricao}</p>

      <Link to={`/posts/${post.id}`}>
        Ler post completo
      </Link>
    </article>
  );
}

export default PostCard;
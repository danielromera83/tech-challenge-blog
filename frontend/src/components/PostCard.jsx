import { Link } from "react-router-dom";

function PostCard({ post }) {
  const descricao =
    post.conteudo.length > 150
      ? `${post.conteudo.substring(0, 150)}...`
      : post.conteudo;

  const dataPublicacao = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("pt-BR")
    : "";

  return (
    <article className="post-card">
      <div className="post-card__meta">
        <span>{post.autor}</span>

        {dataPublicacao && (
          <span>{dataPublicacao}</span>
        )}
      </div>

      <h2>{post.titulo}</h2>

      <p>{descricao}</p>

      <Link
        className="post-card__link"
        to={`/posts/${post.id}`}
      >
        Ler post completo →
      </Link>
    </article>
  );
}

export default PostCard;

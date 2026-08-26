const API_URL = "http://localhost:3000";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.erro || "Erro ao realizar requisição.");
  }

  return data;
}

export function listarPosts() {
  return request("/posts");
}

export function buscarPost(id) {
  return request(`/posts/${id}`);
}

export function buscarPostsPorTermo(termo) {
  return request(`/posts/search?termo=${encodeURIComponent(termo)}`);
}

export function criarPost(post) {
  return request("/posts", {
    method: "POST",
    body: JSON.stringify(post),
  });
}

export function editarPost(id, post) {
  return request(`/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(post),
  });
}

export function excluirPost(id) {
  return request(`/posts/${id}`, {
    method: "DELETE",
  });
}
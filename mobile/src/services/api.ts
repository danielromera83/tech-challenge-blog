import { obterToken } from '@/services/auth';
export type Post = {
  id: number;
  titulo: string;
  conteudo: string;
  autor: string;
  createdAt: string;
  updatedAt: string;
};

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

async function request<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  return response.json();
}

async function authenticatedRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await obterToken();

  if (!token) {
    throw new Error('Usuário não autenticado.');
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.erro || `Erro na API: ${response.status}`
    );
  }

  return data;
}

export function listarPosts() {
  return request<Post[]>('/posts');
}

export function buscarPosts(termo: string) {
  return request<Post[]>(
    `/posts/search?termo=${encodeURIComponent(termo)}`
  );
}
export function buscarPostPorId(id: string | number) {
  return request<Post>(`/posts/${id}`);
}
export type PostInput = {
  titulo: string;
  conteudo: string;
  autor: string;
};

export function criarPost(dados: PostInput) {
  return authenticatedRequest<Post>('/posts', {
    method: 'POST',
    body: JSON.stringify(dados),
  });
}

export function atualizarPost(
  id: string | number,
  dados: PostInput
) {
  return authenticatedRequest<Post>(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dados),
  });
}

export function excluirPost(id: string | number) {
  return authenticatedRequest<{ mensagem: string }>(
    `/posts/${id}`,
    {
      method: 'DELETE',
    }
  );
}
export type Usuario = {
  id: number;
  email: string;
  role: 'PROFESSOR' | 'ALUNO';
  createdAt: string;
  updatedAt: string;
};

export type UsuarioInput = {
  email: string;
  password: string;
};

export type UsuarioUpdateInput = {
  email?: string;
  password?: string;
};

export type PaginatedUsuarios = {
  data: Usuario[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export function listarProfessores(page = 1, limit = 10) {
  return authenticatedRequest<PaginatedUsuarios>(
    `/professores?page=${page}&limit=${limit}`
  );
}

export function buscarProfessorPorId(id: string | number) {
  return authenticatedRequest<Usuario>(
    `/professores/${id}`
  );
}

export function criarProfessor(dados: UsuarioInput) {
  return authenticatedRequest<Usuario>(
    '/professores',
    {
      method: 'POST',
      body: JSON.stringify(dados),
    }
  );
}

export function atualizarProfessor(
  id: string | number,
  dados: UsuarioUpdateInput
) {
  return authenticatedRequest<Usuario>(
    `/professores/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(dados),
    }
  );
}

export function excluirProfessor(id: string | number) {
  return authenticatedRequest<{
    mensagem: string;
    usuario: Usuario;
  }>(`/professores/${id}`, {
    method: 'DELETE',
  });
}

export function listarAlunos(page = 1, limit = 10) {
  return authenticatedRequest<PaginatedUsuarios>(
    `/alunos?page=${page}&limit=${limit}`
  );
}

export function buscarAlunoPorId(id: string | number) {
  return authenticatedRequest<Usuario>(
    `/alunos/${id}`
  );
}

export function criarAluno(dados: UsuarioInput) {
  return authenticatedRequest<Usuario>(
    '/alunos',
    {
      method: 'POST',
      body: JSON.stringify(dados),
    }
  );
}

export function atualizarAluno(
  id: string | number,
  dados: UsuarioUpdateInput
) {
  return authenticatedRequest<Usuario>(
    `/alunos/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(dados),
    }
  );
}

export function excluirAluno(id: string | number) {
  return authenticatedRequest<{
    mensagem: string;
    usuario: Usuario;
  }>(`/alunos/${id}`, {
    method: 'DELETE',
  });
}
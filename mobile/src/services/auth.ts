import * as SecureStore from 'expo-secure-store';

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

const TOKEN_KEY = 'auth_token';

export type UsuarioAutenticado = {
  id: number;
  email: string;
  role: 'PROFESSOR' | 'ALUNO';
};

type LoginResponse = {
  mensagem: string;
  user: UsuarioAutenticado;
  token: string;
};

export async function login(
  email: string,
  password: string
): Promise<UsuarioAutenticado> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.erro || 'Não foi possível realizar o login.'
    );
  }

  const resultado = data as LoginResponse;

  if (!resultado.token) {
    throw new Error('Token de autenticação não recebido.');
  }

  await SecureStore.setItemAsync(
    TOKEN_KEY,
    resultado.token
  );

  return resultado.user;
}

export async function obterToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function logout() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
export async function obterUsuarioAtual(): Promise<UsuarioAutenticado> {
  const token = await obterToken();

  if (!token) {
    throw new Error('Usuário não autenticado.');
  }

  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    await logout();

    throw new Error(
      data.erro || 'Sessão inválida ou expirada.'
    );
  }

  return data.user as UsuarioAutenticado;
}
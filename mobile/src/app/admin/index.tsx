import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  excluirPost,
  listarPosts,
  type Post,
} from '@/services/api';

import {
  logout,
  obterUsuarioAtual,
  type UsuarioAutenticado,
} from '@/services/auth';

export default function AdminScreen() {
  const router = useRouter();

  const [usuario, setUsuario] =
    useState<UsuarioAutenticado | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregarPosts() {
    try {
      const dados = await listarPosts();
      setPosts(dados);
    } catch {
      setErro('Não foi possível carregar os posts.');
    }
  }

  useEffect(() => {
    async function carregarPainel() {
      try {
        setCarregando(true);
        setErro('');

        const usuarioAtual = await obterUsuarioAtual();

        if (usuarioAtual.role !== 'PROFESSOR') {
          await logout();
          router.replace('/login');
          return;
        }

        setUsuario(usuarioAtual);

        const dados = await listarPosts();
        setPosts(dados);
      } catch {
        router.replace('/login');
      } finally {
        setCarregando(false);
      }
    }

    carregarPainel();
  }, [router]);

  async function handleLogout() {
    await logout();
    router.replace('/');
  }

  function handleExcluir(post: Post) {
    Alert.alert(
      'Excluir post',
      `Deseja excluir "${post.titulo}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              setErro('');

              await excluirPost(post.id);
              await carregarPosts();
            } catch (error) {
              setErro(
                error instanceof Error
                  ? error.message
                  : 'Não foi possível excluir o post.'
              );
            }
          },
        },
      ]
    );
  }

  if (carregando) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!usuario) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topActions}>
        <Pressable
          style={styles.homeButton}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.homeButtonText}>
            Home
          </Text>
        </Pressable>

        <Pressable
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>
            Sair
          </Text>
        </Pressable>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>
          Professor autenticado
        </Text>

        <Text style={styles.email}>
          {usuario.email}
        </Text>
      </View>

      <Pressable
        style={styles.newButton}
        onPress={() => router.push('/admin/posts/new')}
      >
        <Text style={styles.newButtonText}>
          + Novo post
        </Text>
      </Pressable>

      <Pressable
        style={styles.managementButton}
        onPress={() => router.push('/admin/professores')}
      >
        <Text style={styles.managementButtonText}>
          Gerenciar professores
        </Text>
      </Pressable>

      <Pressable
        style={styles.managementButton}
        onPress={() => router.push('/admin/alunos')}
      >
        <Text style={styles.managementButtonText}>
          Gerenciar alunos
        </Text>
      </Pressable>

      <Text style={styles.sectionTitle}>
        Gerenciar posts
      </Text>
      {erro ? (
        <Text style={styles.error}>{erro}</Text>
      ) : null}

      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhum post cadastrado.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.postTitle}>
              {item.titulo}
            </Text>

            <Text style={styles.author}>
              Por {item.autor}
            </Text>

            <View style={styles.actions}>
              <Pressable
                style={styles.editButton}
                onPress={() =>
                  router.push({
                    pathname: '/admin/posts/[id]',
                    params: {
                      id: String(item.id),
                    },
                  })
                }
              >
                <Text style={styles.editButtonText}>
                  Editar
                </Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() => handleExcluir(item)}
              >
                <Text style={styles.deleteButtonText}>
                  Excluir
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  header: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111827',
  },
  email: {
    marginTop: 6,
    fontSize: 13,
    textAlign: 'center',
    color: '#6B7280',
  },
  logoutButton: {
    minWidth: 72,
    paddingHorizontal: 14,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#DC2626',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  newButton: {
    marginTop: 24,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#2563EB',
  },
  newButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionTitle: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  error: {
    marginTop: 12,
    fontSize: 14,
    color: '#DC2626',
  },
  list: {
    paddingTop: 16,
    paddingBottom: 32,
    gap: 14,
  },
  card: {
    padding: 18,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  author: {
    marginTop: 6,
    fontSize: 13,
    color: '#6B7280',
  },
  actions: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    flex: 1,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#E0E7FF',
  },
  editButtonText: {
    color: '#3730A3',
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
  },
  deleteButtonText: {
    color: '#B91C1C',
    fontWeight: '600',
  },
  empty: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 15,
    color: '#6B7280',
  },
  managementButton: {
    marginTop: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#111827',
  },
  managementButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  homeButton: {
    minWidth: 72,
    paddingHorizontal: 14,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#111827',
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  topActions: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  buscarPosts,
  listarPosts,
  type Post,
} from '@/services/api';

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [termo, setTermo] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const router = useRouter();

  async function carregarPosts() {
    try {
      setCarregando(true);
      setErro('');

      const dados = await listarPosts();

      setPosts(dados);
    } catch {
      setErro('Não foi possível carregar os posts.');
    } finally {
      setCarregando(false);
    }
  }

  async function pesquisarPosts() {
    const busca = termo.trim();

    if (!busca) {
      await carregarPosts();
      return;
    }

    try {
      setCarregando(true);
      setErro('');

      const dados = await buscarPosts(busca);

      setPosts(dados);
    } catch {
      setErro('Não foi possível realizar a busca.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tech Challenge Blog</Text>

        <Text style={styles.subtitle}>
          Conteúdos para alunos e professores
        </Text>
      </View>

        <Pressable
          style={styles.professorButton}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.professorButtonText}>
            Área do Professor
          </Text>
        </Pressable>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.search}
          placeholder="Buscar posts..."
          placeholderTextColor="#6B7280"
          value={termo}
          onChangeText={setTermo}
          onSubmitEditing={pesquisarPosts}
          returnKeyType="search"
        />

        <Pressable
          style={styles.searchButton}
          onPress={pesquisarPosts}
        >
          <Text style={styles.searchButtonText}>Buscar</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Posts recentes</Text>

      {carregando ? (
        <ActivityIndicator
          size="large"
          style={styles.loading}
        />
      ) : erro ? (
        <Text style={styles.error}>{erro}</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.empty}>
              Nenhum post encontrado.
            </Text>
          }
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => router.push(`/post/${item.id}`)}
            >
              <Text style={styles.postTitle}>
                {item.titulo}
              </Text>

              <Text style={styles.author}>
                Por {item.autor}
              </Text>

              <Text
                style={styles.description}
                numberOfLines={3}
              >
                {item.conteudo}
              </Text>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: '#6B7280',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  search: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#111827',
  },
  searchButton: {
    height: 48,
    paddingHorizontal: 18,
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#2563EB',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  sectionTitle: {
    marginTop: 28,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  loading: {
    marginTop: 40,
  },
  error: {
    marginTop: 24,
    fontSize: 15,
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
  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
  },
  empty: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 15,
    color: '#6B7280',
  },
  professorButton: {
  alignSelf: 'flex-start',
  marginBottom: 20,
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 10,
  backgroundColor: '#111827',
  },
  professorButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
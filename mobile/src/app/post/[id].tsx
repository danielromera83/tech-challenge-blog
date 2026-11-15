import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { buscarPostPorId, type Post } from '@/services/api';

export default function PostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarPost() {
      if (!id) {
        setErro('Post inválido.');
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        setErro('');

        const dados = await buscarPostPorId(id);

        setPost(dados);
      } catch {
        setErro('Não foi possível carregar o post.');
      } finally {
        setCarregando(false);
      }
    }

    carregarPost();
  }, [id]);

  if (carregando) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (erro || !post) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>
          {erro || 'Post não encontrado.'}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>{post.titulo}</Text>

          <Text style={styles.author}>
            Por {post.autor}
          </Text>

          <Text style={styles.body}>
            {post.conteudo}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },
  author: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  body: {
    marginTop: 24,
    fontSize: 17,
    lineHeight: 27,
    color: '#374151',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  error: {
    fontSize: 16,
    color: '#DC2626',
    textAlign: 'center',
  },
});
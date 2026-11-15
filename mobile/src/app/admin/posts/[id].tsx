import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  atualizarPost,
  buscarPostPorId,
} from '@/services/api';

export default function EditarPostScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [autor, setAutor] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
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

        const post = await buscarPostPorId(id);

        setTitulo(post.titulo);
        setConteudo(post.conteudo);
        setAutor(post.autor);
      } catch {
        setErro('Não foi possível carregar o post.');
      } finally {
        setCarregando(false);
      }
    }

    carregarPost();
  }, [id]);

  async function handleSalvar() {
    if (!id) {
      setErro('Post inválido.');
      return;
    }

    if (!titulo.trim() || !conteudo.trim() || !autor.trim()) {
      setErro('Preencha título, conteúdo e autor.');
      return;
    }

    try {
      setSalvando(true);
      setErro('');

      await atualizarPost(id, {
        titulo: titulo.trim(),
        conteudo: conteudo.trim(),
        autor: autor.trim(),
      });

      router.replace('/admin');
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Não foi possível atualizar o post.'
      );
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Editar post</Text>

        <Text style={styles.label}>Título</Text>

        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Digite o título"
          placeholderTextColor="#6B7280"
        />

        <Text style={styles.label}>Autor</Text>

        <TextInput
          style={styles.input}
          value={autor}
          onChangeText={setAutor}
          placeholder="Digite o autor"
          placeholderTextColor="#6B7280"
        />

        <Text style={styles.label}>Conteúdo</Text>

        <TextInput
          style={[styles.input, styles.textArea]}
          value={conteudo}
          onChangeText={setConteudo}
          placeholder="Digite o conteúdo do post"
          placeholderTextColor="#6B7280"
          multiline
          textAlignVertical="top"
        />

        {erro ? (
          <Text style={styles.error}>{erro}</Text>
        ) : null}

        <Pressable
          style={[
            styles.saveButton,
            salvando && styles.buttonDisabled,
          ]}
          onPress={handleSalvar}
          disabled={salvando}
        >
          {salvando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>
              Salvar alterações
            </Text>
          )}
        </Pressable>

        <Pressable onPress={() => router.replace('/admin')}>
          <Text style={styles.cancelLink}>
            Cancelar
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    marginTop: 20,
    marginBottom: 28,
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  label: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    minHeight: 50,
    marginBottom: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    minHeight: 180,
  },
  error: {
    marginBottom: 16,
    fontSize: 14,
    color: '#DC2626',
  },
  saveButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#2563EB',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelLink: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
});
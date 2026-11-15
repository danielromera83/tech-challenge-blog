import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { criarPost } from '@/services/api';

export default function NovoPostScreen() {
  const router = useRouter();

  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [autor, setAutor] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function handleSalvar() {
    if (!titulo.trim() || !conteudo.trim() || !autor.trim()) {
      setErro('Preencha título, conteúdo e autor.');
      return;
    }

    try {
      setCarregando(true);
      setErro('');

      await criarPost({
        titulo: titulo.trim(),
        conteudo: conteudo.trim(),
        autor: autor.trim(),
      });

      router.replace('/admin');
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Não foi possível criar o post.'
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Novo post</Text>

        <Text style={styles.label}>Título</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o título"
          placeholderTextColor="#6B7280"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Autor</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o autor"
          placeholderTextColor="#6B7280"
          value={autor}
          onChangeText={setAutor}
        />

        <Text style={styles.label}>Conteúdo</Text>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Digite o conteúdo do post"
          placeholderTextColor="#6B7280"
          value={conteudo}
          onChangeText={setConteudo}
          multiline
          textAlignVertical="top"
        />

        {erro ? (
          <Text style={styles.error}>{erro}</Text>
        ) : null}

        <Pressable
          style={[
            styles.saveButton,
            carregando && styles.buttonDisabled,
          ]}
          onPress={handleSalvar}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>
              Salvar post
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
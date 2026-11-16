import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
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
  atualizarProfessor,
  buscarProfessorPorId,
} from '@/services/api';

export default function EditarProfessorScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarProfessor() {
      if (!id) {
        setErro('Professor inválido.');
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        setErro('');

        const professor = await buscarProfessorPorId(id);

        setEmail(professor.email);
      } catch (error) {
        setErro(
          error instanceof Error
            ? error.message
            : 'Não foi possível carregar o professor.'
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarProfessor();
  }, [id]);

  async function handleSalvar() {
    if (!id) {
      setErro('Professor inválido.');
      return;
    }

    if (!email.trim()) {
      setErro('Informe o e-mail.');
      return;
    }

    try {
      setSalvando(true);
      setErro('');

      await atualizarProfessor(id, {
        email: email.trim(),
        ...(password ? { password } : {}),
      });

      router.back();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Não foi possível atualizar o professor.'
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
      <Text style={styles.title}>Editar professor</Text>

      <Text style={styles.label}>E-mail</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />

      <Text style={styles.label}>
        Nova senha
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Deixe em branco para manter a atual"
        placeholderTextColor="#6B7280"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
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

      <Pressable
        onPress={() => router.back()}
      >
        <Text style={styles.cancelLink}>
          Cancelar
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  title: {
    marginTop: 24,
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
    height: 50,
    marginBottom: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#111827',
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
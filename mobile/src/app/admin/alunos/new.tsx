import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { criarAluno } from '@/services/api';

export default function NovoAlunoScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function handleSalvar() {
    if (!email.trim() || !password) {
      setErro('Informe e-mail e senha.');
      return;
    }

    try {
      setCarregando(true);
      setErro('');

      await criarAluno({
        email: email.trim(),
        password,
      });

      router.back();
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Não foi possível cadastrar o aluno.'
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo aluno</Text>

      <Text style={styles.label}>E-mail</Text>

      <TextInput
        style={styles.input}
        placeholder="aluno@exemplo.com"
        placeholderTextColor="#6B7280"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite a senha"
        placeholderTextColor="#6B7280"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {erro ? <Text style={styles.error}>{erro}</Text> : null}

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
            Cadastrar aluno
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
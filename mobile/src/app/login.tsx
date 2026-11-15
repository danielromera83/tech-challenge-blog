import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { login, logout } from '@/services/auth';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function handleLogin() {
    if (!email.trim() || !password) {
      setErro('Informe e-mail e senha.');
      return;
    }

    try {
      setCarregando(true);
      setErro('');

      const usuario = await login(email.trim(), password);

      if (usuario.role !== 'PROFESSOR') {
        await logout();
        setErro('Acesso permitido apenas para professores.');
        return;
      }

      router.replace('/admin');
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Não foi possível realizar o login.'
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Acesso do Professor</Text>

        <Text style={styles.subtitle}>
          Entre com suas credenciais para acessar a área administrativa.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#6B7280"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
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
            styles.button,
            carregando && styles.buttonDisabled,
          ]}
          onPress={handleLogin}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </Pressable>

        <Pressable onPress={() => router.replace('/')}>
          <Text style={styles.backLink}>
            Voltar para os posts
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 28,
    fontSize: 16,
    lineHeight: 23,
    color: '#6B7280',
  },
  input: {
    height: 50,
    marginBottom: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#111827',
  },
  error: {
    marginBottom: 14,
    fontSize: 14,
    color: '#DC2626',
  },
  button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#2563EB',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  backLink: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
    color: '#2563EB',
    fontWeight: '600',
  },
});
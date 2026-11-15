import { ActivityIndicator, StyleSheet, View } from 'react-native';
import {
  Stack,
  usePathname,
  useRouter,
} from 'expo-router';
import { useEffect, useState } from 'react';

import {
  logout,
  obterUsuarioAtual,
} from '@/services/auth';

export default function AdminLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const [validando, setValidando] = useState(true);

  useEffect(() => {
    let ativo = true;

    async function validarAcesso() {
      setValidando(true);

      try {
        const usuario = await obterUsuarioAtual();

        if (usuario.role !== 'PROFESSOR') {
          await logout();

          if (ativo) {
            router.replace('/login');
          }

          return;
        }

        if (ativo) {
          setValidando(false);
        }
      } catch {
        if (ativo) {
          router.replace('/login');
        }
      }
    }

    validarAcesso();

    return () => {
      ativo = false;
    };
  }, [pathname, router]);

  if (validando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Área do Professor' }}
      />

      <Stack.Screen
        name="posts/new"
        options={{ title: 'Novo post' }}
      />

      <Stack.Screen
        name="posts/[id]"
        options={{ title: 'Editar post' }}
      />

      <Stack.Screen
        name="professores/index"
        options={{ title: 'Professores' }}
      />

      <Stack.Screen
        name="professores/new"
        options={{ title: 'Novo professor' }}
      />

      <Stack.Screen
        name="professores/[id]"
        options={{ title: 'Editar professor' }}
      />

      <Stack.Screen
        name="alunos/index"
        options={{ title: 'Alunos' }}
      />

      <Stack.Screen
        name="alunos/new"
        options={{ title: 'Novo aluno' }}
      />

      <Stack.Screen
        name="alunos/[id]"
        options={{ title: 'Editar aluno' }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  excluirProfessor,
  listarProfessores,
  type Usuario,
} from '@/services/api';

export default function ProfessoresScreen() {
  const router = useRouter();

  const [professores, setProfessores] = useState<Usuario[]>([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [total, setTotal] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregarProfessores = useCallback(async (page: number) => {
    try {
      setCarregando(true);
      setErro('');

      const resultado = await listarProfessores(page, 10);

      setProfessores(resultado.data);
      setPagina(resultado.pagination.page);
      setTotalPaginas(
        Math.max(resultado.pagination.totalPages, 1)
      );
      setTotal(resultado.pagination.total);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Não foi possível carregar os professores.'
      );
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarProfessores(1);
    }, [carregarProfessores])
  );

  function handleExcluir(professor: Usuario) {
    Alert.alert(
      'Excluir professor',
      `Deseja excluir ${professor.email}?`,
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

              await excluirProfessor(professor.id);

              await carregarProfessores(pagina);
            } catch (error) {
              setErro(
                error instanceof Error
                  ? error.message
                  : 'Não foi possível excluir o professor.'
              );
            }
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Professores</Text>

          <Text style={styles.subtitle}>
            {total} professor(es) cadastrado(s)
          </Text>
        </View>

        <Pressable
          style={styles.newButton}
          onPress={() =>
            router.push('/admin/professores/new')
          }
        >
          <Text style={styles.newButtonText}>+ Novo</Text>
        </Pressable>
      </View>

      {erro ? (
        <Text style={styles.error}>{erro}</Text>
      ) : null}

      {carregando ? (
        <ActivityIndicator
          size="large"
          style={styles.loading}
        />
      ) : (
        <>
          <FlatList
            data={professores}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.empty}>
                Nenhum professor cadastrado.
              </Text>
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.email}>
                  {item.email}
                </Text>

                <View style={styles.actions}>
                  <Pressable
                    style={styles.editButton}
                    onPress={() =>
                      router.push({
                        pathname:
                          '/admin/professores/[id]',
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

          <View style={styles.pagination}>
            <Pressable
              style={[
                styles.pageButton,
                pagina <= 1 && styles.disabledButton,
              ]}
              disabled={pagina <= 1}
              onPress={() =>
                carregarProfessores(pagina - 1)
              }
            >
              <Text style={styles.pageButtonText}>
                Anterior
              </Text>
            </Pressable>

            <Text style={styles.pageText}>
              Página {pagina} de {totalPaginas}
            </Text>

            <Pressable
              style={[
                styles.pageButton,
                pagina >= totalPaginas &&
                  styles.disabledButton,
              ]}
              disabled={pagina >= totalPaginas}
              onPress={() =>
                carregarProfessores(pagina + 1)
              }
            >
              <Text style={styles.pageButtonText}>
                Próxima
              </Text>
            </Pressable>
          </View>
        </>
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
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: '#6B7280',
  },
  newButton: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: '#2563EB',
  },
  newButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  error: {
    marginTop: 16,
    color: '#DC2626',
    fontSize: 14,
  },
  loading: {
    marginTop: 40,
  },
  list: {
    paddingTop: 20,
    paddingBottom: 20,
    gap: 14,
  },
  card: {
    padding: 18,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  email: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
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
    marginTop: 30,
    textAlign: 'center',
    color: '#6B7280',
  },
  pagination: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pageButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 9,
    backgroundColor: '#111827',
  },
  disabledButton: {
    opacity: 0.35,
  },
  pageButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  pageText: {
    fontSize: 13,
    color: '#6B7280',
  },
});
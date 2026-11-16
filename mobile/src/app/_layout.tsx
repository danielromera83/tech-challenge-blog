import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="post/[id]"
        options={{
          title: 'Post',
          headerBackTitle: 'Voltar',
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          title: 'Acesso do Professor',
          headerBackTitle: 'Voltar',
        }}
      />

      <Stack.Screen
        name="admin"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
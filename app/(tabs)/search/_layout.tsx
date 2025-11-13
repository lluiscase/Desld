import { Stack } from 'expo-router';

export default function PostFlowLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}} />
      <Stack.Screen name="resultSearch" options={{ headerShown: false }} />
      <Stack.Screen name="animalSelect" options={{ headerShown: false }} />
    </Stack>
  );
}

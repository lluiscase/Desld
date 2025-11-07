import { Stack } from 'expo-router';

export default function PostFlowLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}} />
      <Stack.Screen name="photo" options={{ headerShown: false }} />
      <Stack.Screen name="typeAnimal" options={{ headerShown: false }} />
      <Stack.Screen name="situation" options={{ headerShown: false }} />
      <Stack.Screen name="descripition" options={{ headerShown: false }} />
      <Stack.Screen name="preVisulation" options={{ headerShown: false }} />
      <Stack.Screen name="history" options={{ headerShown: false }} />
    </Stack>
  );
}

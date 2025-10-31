import { Stack } from 'expo-router';

export default function SlidesLayout() {
  return (
    <Stack>
      <Stack.Screen name="step2" options={{ headerShown: false }} />
    </Stack>
  );
}

import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { AuthProvider, useAuth } from "../src/context/authContext";

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const currentSegment = segments[0];

  useEffect(() => {
    if (isLoading) return;

    const isPublicRoute = currentSegment === 'index' || currentSegment === '(auth)' || currentSegment === '(slides)';

    if (user && isPublicRoute) {
      router.replace('/home');
    }
    else if (!user && !isPublicRoute) {
      router.replace('/');
    }

  }, [user, isLoading, currentSegment, router]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl font-bold">Carregando App...</Text>
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(slides)" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";
    if (!user && !inAuthGroup && !isLoadingUser) {
      router.replace("/auth");
    } else if (user && inAuthGroup && !isLoadingUser) {
      router.replace("/");
    }
  }, [router, segments, isLoadingUser, user]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <AuthGuard>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </AuthGuard>
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
  );
}

import { AuthProvider } from "@/lib/auth-context";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuth = false;

  useEffect(() => {
    if (!isAuth) {
      router.replace("/auth");
    }
  });

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGuard>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AuthGuard>
    </AuthProvider>
  );
}

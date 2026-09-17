import { Stack } from "expo-router";
import { FavoriteProvider } from "../../context/FavoriteContext";

export default function StateManagementLayout() {
  return (
    <FavoriteProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: "#10B981" },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="bookListScreen"
          options={{ title: "Daftar Buku" }}
        />
        <Stack.Screen
          name="favoriteListScreen"
          options={{ title: "Buku Favorit Saya" }}
        />
      </Stack>
    </FavoriteProvider>
  );
}

import { Stack } from "expo-router";
import { FavoriteProvider } from "../../context/FavoriteContext";

export default function StateManagementLayout() {
  return (
    <FavoriteProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </FavoriteProvider>
  );
}

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="02-input-handling" />
      <Stack.Screen name="03-state-management" />
      <Stack.Screen name="04-navigation-routing" />
    </Stack>
  );
}

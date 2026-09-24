import { Stack } from "expo-router";

export default function NavigationRoutingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

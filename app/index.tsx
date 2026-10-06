import { useAuth } from "@/context/AuthContext";
import { COLORS } from "@/constants/tokens";
import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

// Auth gate: arahkan ke login atau tab beranda sesuai status auth
export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary[700]} />
      </View>
    );
  }

  return <Redirect href={user ? "/(tabs)/beranda" : "/login"} />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background.light,
  },
});

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZES,
  SHADOWS,
  SPACING,
} from "@/constants/tokens";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { gelap, toggleTema } = useTheme();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const initial = (user?.nama ?? "?").charAt(0).toUpperCase();

  return (
    <SafeAreaView
      style={[styles.screen, gelap && styles.screenDark]}
      edges={["top"]}
    >
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <Text style={[styles.nama, gelap && styles.namaDark]}>
          {user?.nama ?? "-"}
        </Text>
        <Text style={[styles.email, gelap && styles.emailDark]}>
          {user?.email ?? "-"}
        </Text>

        <Pressable
          style={[styles.row, gelap && styles.rowDark]}
          onPress={toggleTema}
        >
          <Ionicons
            name={gelap ? "sunny-outline" : "moon-outline"}
            size={20}
            color={gelap ? "#F1F5F9" : COLORS.text.primary}
          />
          <Text style={[styles.rowText, gelap && styles.rowTextDark]}>
            Tema: {gelap ? "Gelap" : "Terang"}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={gelap ? "#94A3B8" : COLORS.text.tertiary}
          />
        </Pressable>

        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.text.white} />
          <Text style={styles.logoutText}>Keluar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
  screenDark: {
    backgroundColor: COLORS.background.dark,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: SPACING.xxl,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.primary[700],
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.xxl,
    ...SHADOWS.md,
  },
  avatarText: {
    color: COLORS.text.white,
    fontSize: 36,
    fontWeight: "800",
  },
  nama: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: "800",
    color: COLORS.text.primary,
    marginTop: SPACING.lg,
  },
  namaDark: {
    color: "#F1F5F9",
  },
  email: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
    marginBottom: SPACING.xxl,
  },
  emailDark: {
    color: "#94A3B8",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: COLORS.background.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.md,
    ...SHADOWS.sm,
  },
  rowDark: {
    backgroundColor: "#1E293B",
  },
  rowText: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  rowTextDark: {
    color: "#F1F5F9",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    width: "100%",
    backgroundColor: COLORS.error,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginTop: SPACING.xl,
  },
  logoutText: {
    color: COLORS.text.white,
    fontSize: FONT_SIZES.md,
    fontWeight: "700",
  },
});

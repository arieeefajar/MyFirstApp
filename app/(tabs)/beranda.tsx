import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import { useTheme } from "@/context/ThemeContext";
import {
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

export default function BerandaScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { gelap, toggleTema } = useTheme();
  const { totalItems } = useCart();
  const { jumlahNotifikasi } = useNotification();

  const menu: {
    title: string;
    desc: string;
    icon: keyof typeof Ionicons.glyphMap;
    path: string;
  }[] = [
    {
      title: "Modul Pembelajaran",
      desc: "Jelajahi materi & tantangan",
      icon: "book-outline",
      path: "/(tabs)/modul",
    },
    {
      title: "Produk Buku",
      desc: "Katalog & keranjang belanja",
      icon: "pricetags-outline",
      path: "/(tabs)/produk",
    },
    {
      title: "Profil Saya",
      desc: "Kelola akun & keluar",
      icon: "person-outline",
      path: "/(tabs)/profile",
    },
  ];

  return (
    <SafeAreaView
      style={[styles.screen, gelap && styles.screenDark]}
      edges={["top"]}
    >
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.greeting, gelap && styles.greetingDark]}>
            Halo, {user?.nama ?? "Pengguna"} 👋
          </Text>
          <Text style={[styles.subgreeting, gelap && styles.subgreetingDark]}>
            Selamat datang kembali
          </Text>
        </View>
        <Pressable
          style={[styles.iconBtn, gelap && styles.iconBtnDark]}
          onPress={toggleTema}
        >
          <Ionicons
            name={gelap ? "sunny" : "moon"}
            size={20}
            color={gelap ? COLORS.primary[100] : COLORS.primary[700]}
          />
        </Pressable>
        <Pressable
          style={[styles.iconBtn, gelap && styles.iconBtnDark]}
          onPress={() =>
            router.push("/05-state-management-lanjut/daftarNotifikasiScreen")
          }
        >
          <Ionicons
            name="notifications-outline"
            size={20}
            color={gelap ? COLORS.primary[100] : COLORS.primary[700]}
          />
          {jumlahNotifikasi > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{jumlahNotifikasi}</Text>
            </View>
          )}
        </Pressable>
        <Pressable
          style={[styles.iconBtn, gelap && styles.iconBtnDark]}
          onPress={() => router.push("/03-state-management/keranjangScreen")}
        >
          <Ionicons
            name="cart-outline"
            size={20}
            color={gelap ? COLORS.primary[100] : COLORS.primary[700]}
          />
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </Pressable>
      </View>

      <View style={styles.container}>
        {menu.map((item) => (
          <Pressable
            key={item.path}
            style={[styles.card, gelap && styles.cardDark]}
            onPress={() => router.push(item.path as never)}
          >
            <View style={styles.cardIcon}>
              <Ionicons
                name={item.icon}
                size={22}
                color={COLORS.primary[700]}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardTitle, gelap && styles.cardTitleDark]}>
                {item.title}
              </Text>
              <Text style={[styles.cardDesc, gelap && styles.cardDescDark]}>
                {item.desc}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={gelap ? "#94A3B8" : COLORS.text.tertiary}
            />
          </Pressable>
        ))}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
  greeting: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "800",
    color: COLORS.text.primary,
  },
  greetingDark: {
    color: "#F1F5F9",
  },
  subgreeting: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  subgreetingDark: {
    color: "#94A3B8",
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.background.white,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.sm,
  },
  iconBtnDark: {
    backgroundColor: "#1E293B",
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.error,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: COLORS.text.white,
    fontSize: 11,
    fontWeight: "700",
  },
  container: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    gap: SPACING.md,
    ...SHADOWS.md,
  },
  cardDark: {
    backgroundColor: "#1E293B",
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.primary[50],
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
    color: COLORS.text.primary,
  },
  cardTitleDark: {
    color: "#F1F5F9",
  },
  cardDesc: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  cardDescDark: {
    color: "#94A3B8",
  },
});

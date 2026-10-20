import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZES,
  SHADOWS,
  SPACING,
} from "@/constants/tokens";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

const API_COLOR = "#06B6D4";
const API_BG = "#CFFAFE";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function DaftarUserScreen() {
  const { gelap } = useTheme();
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function ambilData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );

        if (!response.ok) {
          throw new Error(`Gagal memuat data (status ${response.status})`);
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Terjadi kesalahan",
        );
      } finally {
        setLoading(false);
      }
    }

    ambilData();
  }, []);

  const header = (
    <ModuleHeader
      title="Daftar User"
      subtitle="Menampilkan data pengguna dari REST API"
      category="09. Integrasi API"
      color={API_COLOR}
      gelap={gelap}
    />
  );

  if (loading) {
    return (
      <View style={[styles.screen, gelap && styles.screenDark]}>
        {header}
        <View style={styles.center}>
          <View style={[styles.stateCard, gelap && styles.stateCardDark]}>
            <View
              style={[
                styles.loadingBadge,
                gelap && styles.loadingBadgeDark,
              ]}
            >
              <ActivityIndicator size="large" color={API_COLOR} />
            </View>
            <Text
              style={[styles.stateTitle, gelap && styles.stateTitleDark]}
            >
              Memuat data user
            </Text>
            <Text style={[styles.stateText, gelap && styles.stateTextDark]}>
              Mengambil daftar pengguna dari REST API...
            </Text>
          </View>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.screen, gelap && styles.screenDark]}>
        {header}
        <View style={styles.center}>
          <View style={[styles.stateCard, gelap && styles.stateCardDark]}>
            <View
              style={[styles.errorBadge, gelap && styles.errorBadgeDark]}
            >
              <Ionicons
                name="alert-circle-outline"
                size={34}
                color={COLORS.error}
              />
            </View>
            <Text
              style={[styles.stateTitle, gelap && styles.stateTitleDark]}
            >
              Gagal Memuat Data
            </Text>
            <Text style={[styles.stateText, gelap && styles.stateTextDark]}>
              {error}
            </Text>
            <Text style={styles.errorHint}>
              Pastikan koneksi internet aktif, lalu buka kembali layar ini.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.screen, gelap && styles.screenDark]}>
      {header}
      <FlatList
        data={data}
        extraData={gelap}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={[styles.summaryCard, gelap && styles.summaryCardDark]}>
            <View style={styles.summaryIcon}>
              <Ionicons name="people" size={22} color={COLORS.text.white} />
            </View>
            <View style={styles.summaryContent}>
              <Text
                style={[
                  styles.summaryTitle,
                  gelap && styles.summaryTitleDark,
                ]}
              >
                Direktori Pengguna
              </Text>
              <Text
                style={[
                  styles.summarySubtitle,
                  gelap && styles.summarySubtitleDark,
                ]}
              >
                Sumber: JSONPlaceholder REST API
              </Text>
            </View>
            <View
              style={[styles.summaryCount, gelap && styles.summaryCountDark]}
            >
              <Text
                style={[
                  styles.summaryCountNumber,
                  gelap && styles.summaryCountNumberDark,
                ]}
              >
                {data.length}
              </Text>
              <Text style={styles.summaryCountLabel}>USER</Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={[styles.emptyIcon, gelap && styles.emptyIconDark]}>
              <Ionicons
                name="people-outline"
                size={28}
                color={COLORS.text.tertiary}
              />
            </View>
            <Text
              style={[styles.emptyTitle, gelap && styles.emptyTitleDark]}
            >
              Belum ada data user
            </Text>
            <Text style={[styles.emptyText, gelap && styles.emptyTextDark]}>
              REST API tidak mengembalikan data pengguna.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.item, gelap && styles.itemDark]}>
            <View style={[styles.avatar, gelap && styles.avatarDark]}>
              <Text
                style={[styles.avatarText, gelap && styles.avatarTextDark]}
              >
                {item.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.itemContent}>
              <Text
                style={[styles.nama, gelap && styles.namaDark]}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <View style={styles.emailRow}>
                <Ionicons
                  name="mail-outline"
                  size={13}
                  color={gelap ? "#94A3B8" : COLORS.text.tertiary}
                />
                <Text
                  style={[styles.email, gelap && styles.emailDark]}
                  numberOfLines={1}
                >
                  {item.email}
                </Text>
              </View>
            </View>
            <View style={[styles.idBadge, gelap && styles.idBadgeDark]}>
              <Text style={[styles.idText, gelap && styles.idTextDark]}>
                #{item.id}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  stateCard: {
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    backgroundColor: COLORS.background.white,
    borderRadius: BORDER_RADIUS.xxl,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    padding: SPACING.xxl,
    ...SHADOWS.md,
  },
  stateCardDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  loadingBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: API_BG,
    marginBottom: SPACING.lg,
  },
  loadingBadgeDark: {
    backgroundColor: "#164E63",
  },
  errorBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEE2E2",
    marginBottom: SPACING.lg,
  },
  errorBadgeDark: {
    backgroundColor: "#450A0A",
  },
  stateTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
    color: COLORS.text.primary,
    textAlign: "center",
  },
  stateTitleDark: {
    color: "#F1F5F9",
  },
  stateText: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZES.sm,
    lineHeight: 18,
    color: COLORS.text.secondary,
    textAlign: "center",
  },
  stateTextDark: {
    color: "#94A3B8",
  },
  errorHint: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.xs,
    lineHeight: 16,
    color: COLORS.text.tertiary,
    textAlign: "center",
  },
  container: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
    gap: 10,
  },
  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    padding: SPACING.md,
    marginBottom: SPACING.xs,
    backgroundColor: API_BG,
    borderRadius: BORDER_RADIUS.xxl,
    borderWidth: 1,
    borderColor: "#A5F3FC",
  },
  summaryCardDark: {
    backgroundColor: "#164E63",
    borderColor: "#155E75",
  },
  summaryIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: API_COLOR,
  },
  summaryContent: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: "700",
    color: "#164E63",
  },
  summaryTitleDark: {
    color: "#ECFEFF",
  },
  summarySubtitle: {
    marginTop: 2,
    fontSize: FONT_SIZES.xs,
    color: "#0E7490",
  },
  summarySubtitleDark: {
    color: "#A5F3FC",
  },
  summaryCount: {
    minWidth: 54,
    alignItems: "center",
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.background.white,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: "#A5F3FC",
  },
  summaryCountDark: {
    backgroundColor: COLORS.background.dark,
    borderColor: "#155E75",
  },
  summaryCountNumber: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "800",
    lineHeight: 22,
    color: "#0E7490",
  },
  summaryCountNumberDark: {
    color: "#67E8F9",
  },
  summaryCountLabel: {
    marginTop: 1,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.6,
    color: COLORS.text.tertiary,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    backgroundColor: COLORS.background.white,
    borderRadius: BORDER_RADIUS.xxl,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    ...SHADOWS.sm,
  },
  itemDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: API_BG,
  },
  avatarDark: {
    backgroundColor: "#164E63",
  },
  avatarText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "800",
    color: "#0E7490",
  },
  avatarTextDark: {
    color: "#67E8F9",
  },
  itemContent: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  nama: {
    fontSize: FONT_SIZES.md,
    fontWeight: "700",
    color: COLORS.text.primary,
  },
  namaDark: {
    color: "#F1F5F9",
  },
  emailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 3,
  },
  email: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
  emailDark: {
    color: "#94A3B8",
  },
  idBadge: {
    minWidth: 36,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.sm,
    marginLeft: SPACING.sm,
    backgroundColor: "#F1F5F9",
    borderRadius: BORDER_RADIUS.xl,
  },
  idBadgeDark: {
    backgroundColor: "#334155",
  },
  idText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: "700",
    color: COLORS.text.tertiary,
  },
  idTextDark: {
    color: "#CBD5E1",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: SPACING.xxxl,
    paddingHorizontal: SPACING.xl,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
    backgroundColor: "#F1F5F9",
  },
  emptyIconDark: {
    backgroundColor: "#1E293B",
  },
  emptyTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: "700",
    color: COLORS.text.primary,
  },
  emptyTitleDark: {
    color: "#F1F5F9",
  },
  emptyText: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    textAlign: "center",
  },
  emptyTextDark: {
    color: "#94A3B8",
  },
});

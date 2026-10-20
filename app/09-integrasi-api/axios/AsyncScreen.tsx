import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZES,
  SHADOWS,
  SPACING,
} from "@/constants/tokens";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ModuleHeader from "@/components/ModuleHeader";
import type { User } from "@/types/api";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const API_COLOR = "#06B6D4";
const API_BG = "#CFFAFE";

export default function AsyncScreen() {
  const { gelap } = useTheme();
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let aktif = true;

    async function ambilData() {
      try {
        const response = await axios.get<User[]>(USERS_URL);

        if (aktif) {
          setData(response.data);
        }
      } catch (err) {
        if (!aktif) return;

        setError(
          isAxiosError(err)
            ? err.message
            : "Gagal memuat data pengguna",
        );
      } finally {
        if (aktif) {
          setLoading(false);
        }
      }
    }

    ambilData();

    return () => {
      aktif = false;
    };
  }, []);

  return (
    <View style={[styles.screen, gelap && styles.screenDark]}>
      <ModuleHeader
        title="Axios Async/Await"
        subtitle="Mengambil data user menggunakan async/await"
        category="09. Integrasi API"
        color={API_COLOR}
        gelap={gelap}
      />

      {loading ? (
        <View style={styles.center}>
          <View style={[styles.stateCard, gelap && styles.stateCardDark]}>
            <ActivityIndicator size="large" color={API_COLOR} />
            <Text
              style={[styles.stateTitle, gelap && styles.stateTitleDark]}
            >
              Memuat data...
            </Text>
          </View>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <View style={[styles.stateCard, gelap && styles.stateCardDark]}>
            <Ionicons
              name="alert-circle-outline"
              size={34}
              color={COLORS.error}
            />
            <Text
              style={[styles.stateTitle, gelap && styles.stateTitleDark]}
            >
              Gagal Memuat Data
            </Text>
            <Text style={[styles.stateText, gelap && styles.stateTextDark]}>
              {error}
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={data}
          extraData={gelap}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View
              style={[styles.banner, gelap && styles.bannerDark]}
            >
              <View style={styles.bannerIcon}>
                <Ionicons name="code-slash" size={20} color="#fff" />
              </View>
              <View style={styles.bannerContent}>
                <Text
                  style={[
                    styles.bannerTitle,
                    gelap && styles.bannerTitleDark,
                  ]}
                >
                  {'await axios.get("/users")'}
                </Text>
                <Text
                  style={[
                    styles.bannerText,
                    gelap && styles.bannerTextDark,
                  ]}
                >
                  {data.length} user berhasil dimuat
                </Text>
              </View>
            </View>
          }
          renderItem={({ item }) => (
            <View style={[styles.card, gelap && styles.cardDark]}>
              <View style={[styles.avatar, gelap && styles.avatarDark]}>
                <Text
                  style={[
                    styles.avatarText,
                    gelap && styles.avatarTextDark,
                  ]}
                >
                  {item.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.cardContent}>
                <Text
                  style={[styles.nama, gelap && styles.namaDark]}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <Text
                  style={[styles.email, gelap && styles.emailDark]}
                  numberOfLines={1}
                >
                  {item.email}
                </Text>
              </View>
              <Text style={[styles.id, gelap && styles.idDark]}>
                #{item.id}
              </Text>
            </View>
          )}
        />
      )}
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
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xl,
  },
  stateCard: {
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
    gap: SPACING.sm,
    padding: SPACING.xxl,
    backgroundColor: COLORS.background.white,
    borderRadius: BORDER_RADIUS.xxl,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    ...SHADOWS.md,
  },
  stateCardDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
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
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    textAlign: "center",
  },
  stateTextDark: {
    color: "#94A3B8",
  },
  listContent: {
    gap: 10,
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  banner: {
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
  bannerDark: {
    backgroundColor: "#164E63",
    borderColor: "#155E75",
  },
  bannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: API_COLOR,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: "700",
    color: "#164E63",
  },
  bannerTitleDark: {
    color: "#ECFEFF",
  },
  bannerText: {
    marginTop: 2,
    fontSize: FONT_SIZES.xs,
    color: "#0E7490",
  },
  bannerTextDark: {
    color: "#A5F3FC",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.background.white,
    borderRadius: BORDER_RADIUS.xxl,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    ...SHADOWS.sm,
  },
  cardDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: API_BG,
  },
  avatarDark: {
    backgroundColor: "#164E63",
  },
  avatarText: {
    fontSize: FONT_SIZES.md,
    fontWeight: "800",
    color: "#0E7490",
  },
  avatarTextDark: {
    color: "#67E8F9",
  },
  cardContent: {
    flex: 1,
  },
  nama: {
    fontSize: FONT_SIZES.md,
    fontWeight: "700",
    color: COLORS.text.primary,
  },
  namaDark: {
    color: "#F1F5F9",
  },
  email: {
    marginTop: 2,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
  emailDark: {
    color: "#94A3B8",
  },
  id: {
    fontSize: FONT_SIZES.xs,
    fontWeight: "700",
    color: COLORS.text.tertiary,
  },
  idDark: {
    color: "#64748B",
  },
});

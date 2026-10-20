import ModuleHeader from "@/components/ModuleHeader";
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZES,
  SHADOWS,
  SPACING,
} from "@/constants/tokens";
import { useTheme } from "@/context/ThemeContext";
import { getUsers } from "@/services/api/userApi";
import type { User } from "@/types/api";
import { Ionicons } from "@expo/vector-icons";
import { isCancel } from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const API_COLOR = "#06B6D4";
const API_BG = "#CFFAFE";

export default function PencarianScreen() {
  const { gelap } = useTheme();
  const [kata, setKata] = useState("");
  const [hasil, setHasil] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const query = kata.trim();
  const adaKataKunci = query !== "";

  useEffect(() => {
    if (query === "") {
      setHasil([]);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    let aktif = true;

    async function cari() {
      try {
        setLoading(true);
        setError(null);

        const response = await getUsers(controller.signal);

        if (!aktif || controller.signal.aborted) return;

        // JSONPlaceholder belum mendukung filter `name_like`,
        // jadi hasil pencarian difilter di sisi client.
        const normalized = query.toLowerCase();
        setHasil(
          response.data.filter(
            (user) =>
              user.name.toLowerCase().includes(normalized) ||
              user.email.toLowerCase().includes(normalized),
          ),
        );
      } catch (err) {
        if (!aktif || isCancel(err)) {
          // Request lama dibatalkan karena kata kunci sudah berubah.
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Gagal mencari user. Coba lagi.",
        );
      } finally {
        if (aktif && !controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    cari();

    return () => {
      aktif = false;
      controller.abort();
    };
  }, [query]);

  const statusText = !adaKataKunci
    ? "Ketik nama atau email untuk mulai mencari"
    : loading
      ? "Mencari user..."
      : error
        ? "Pencarian gagal"
        : `${hasil.length} user ditemukan`;

  return (
    <View style={[styles.screen, gelap && styles.screenDark]}>
      <ModuleHeader
        title="Pencarian User (Axios)"
        subtitle="Membatalkan request lama dengan AbortController"
        category="09. Integrasi API"
        color={API_COLOR}
        gelap={gelap}
      />

      <View style={styles.searchArea}>
        <View style={[styles.searchBox, gelap && styles.searchBoxDark]}>
          <Ionicons
            name="search"
            size={18}
            color={gelap ? "#94A3B8" : COLORS.text.tertiary}
          />
          <TextInput
            style={[styles.input, gelap && styles.inputDark]}
            placeholder="Cari nama atau email..."
            placeholderTextColor={gelap ? "#64748B" : COLORS.text.tertiary}
            selectionColor={API_COLOR}
            value={kata}
            onChangeText={setKata}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
          {kata.length > 0 && (
            <Pressable
              onPress={() => setKata("")}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Hapus pencarian"
            >
              <Ionicons
                name="close-circle"
                size={18}
                color={gelap ? "#64748B" : COLORS.text.tertiary}
              />
            </Pressable>
          )}
        </View>

        <View style={styles.statusRow}>
          <Text style={[styles.statusText, gelap && styles.statusTextDark]}>
            {statusText}
          </Text>
          {loading && <ActivityIndicator size="small" color={API_COLOR} />}
        </View>
      </View>

      <View style={[styles.infoCard, gelap && styles.infoCardDark]}>
        <Ionicons
          name="git-branch-outline"
          size={18}
          color={gelap ? "#67E8F9" : "#0E7490"}
        />
        <Text style={[styles.infoText, gelap && styles.infoTextDark]}>
          Setiap perubahan kata kunci membatalkan request sebelumnya. Ini
          mencegah respons lama menimpa hasil terbaru.
        </Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={API_COLOR} />
          <Text style={[styles.loadingText, gelap && styles.loadingTextDark]}>
            Mencari user...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <View style={[styles.stateCard, gelap && styles.stateCardDark]}>
            <View
              style={[styles.errorBadge, gelap && styles.errorBadgeDark]}
            >
              <Ionicons
                name="alert-circle-outline"
                size={32}
                color={COLORS.error}
              />
            </View>
            <Text
              style={[styles.stateTitle, gelap && styles.stateTitleDark]}
            >
              Pencarian Gagal
            </Text>
            <Text style={[styles.stateText, gelap && styles.stateTextDark]}>
              {error}
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={hasil}
          extraData={gelap}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View style={[styles.emptyIcon, gelap && styles.emptyIconDark]}>
                <Ionicons
                  name={adaKataKunci ? "search-outline" : "text-outline"}
                  size={30}
                  color={COLORS.text.tertiary}
                />
              </View>
              <Text
                style={[styles.emptyTitle, gelap && styles.emptyTitleDark]}
              >
                {adaKataKunci ? "User tidak ditemukan" : "Mulai pencarian"}
              </Text>
              <Text
                style={[styles.emptyText, gelap && styles.emptyTextDark]}
              >
                {adaKataKunci
                  ? `Tidak ada nama atau email yang cocok dengan "${query}".`
                  : "Ketik nama atau email pada kolom pencarian di atas."}
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
                <Text
                  style={[styles.email, gelap && styles.emailDark]}
                  numberOfLines={1}
                >
                  {item.email}
                </Text>
              </View>
              <View style={[styles.idBadge, gelap && styles.idBadgeDark]}>
                <Text style={[styles.idText, gelap && styles.idTextDark]}>
                  #{item.id}
                </Text>
              </View>
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
  searchArea: {
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.background.white,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    ...SHADOWS.sm,
  },
  searchBoxDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
  },
  inputDark: {
    color: "#F1F5F9",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.sm,
    paddingHorizontal: 2,
  },
  statusText: {
    flex: 1,
    fontSize: FONT_SIZES.xs,
    color: COLORS.text.tertiary,
  },
  statusTextDark: {
    color: "#64748B",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.sm,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
    padding: SPACING.md,
    backgroundColor: API_BG,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: "#A5F3FC",
  },
  infoCardDark: {
    backgroundColor: "#164E63",
    borderColor: "#155E75",
  },
  infoText: {
    flex: 1,
    fontSize: FONT_SIZES.xs,
    lineHeight: 16,
    color: "#0E7490",
  },
  infoTextDark: {
    color: "#A5F3FC",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xl,
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
  loadingTextDark: {
    color: "#94A3B8",
  },
  stateCard: {
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
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
  errorBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
    backgroundColor: "#FEE2E2",
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
  listContent: {
    flexGrow: 1,
    gap: 10,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.xxxl,
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
  email: {
    marginTop: 3,
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    textAlign: "center",
  },
  emptyTitleDark: {
    color: "#F1F5F9",
  },
  emptyText: {
    maxWidth: 300,
    marginTop: SPACING.xs,
    fontSize: FONT_SIZES.sm,
    lineHeight: 18,
    color: COLORS.text.secondary,
    textAlign: "center",
  },
  emptyTextDark: {
    color: "#94A3B8",
  },
});

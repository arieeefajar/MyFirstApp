import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZES,
  SHADOWS,
  SPACING,
} from "@/constants/tokens";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

const API_COLOR = "#06B6D4";
const API_BG = "#CFFAFE";

export default function BuatPostScreen() {
  const { gelap } = useTheme();
  const [judul, setJudul] = useState("");
  const [mengirim, setMengirim] = useState(false);

  const kirimPost = async () => {
    setMengirim(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: judul, body: "", userId: 1 }),
        },
      );

      if (!response.ok) throw new Error("Gagal mengirim data");

      const hasil = await response.json();
      Alert.alert("Berhasil", `Post dibuat dengan ID: ${hasil.id}`);
      setJudul("");
    } catch (err) {
      Alert.alert(
        "Gagal",
        err instanceof Error ? err.message : "Terjadi kesalahan",
      );
    } finally {
      setMengirim(false);
    }
  };

  return (
    <View style={[styles.screen, gelap && styles.screenDark]}>
      <ModuleHeader
        title="Buat Post"
        subtitle="Kirim data post baru ke REST API"
        category="09. Integrasi API"
        color={API_COLOR}
        gelap={gelap}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.card, gelap && styles.cardDark]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBadge, gelap && styles.iconBadgeDark]}>
                <Ionicons
                  name="cloud-upload-outline"
                  size={22}
                  color={API_COLOR}
                />
              </View>
              <View style={styles.cardHeaderText}>
                <Text style={[styles.cardTitle, gelap && styles.cardTitleDark]}>
                  Post Baru
                </Text>
                <Text
                  style={[
                    styles.cardSubtitle,
                    gelap && styles.cardSubtitleDark,
                  ]}
                >
                  Lengkapi judul, lalu kirim ke server.
                </Text>
              </View>
            </View>

            <Text style={[styles.label, gelap && styles.labelDark]}>
              Judul Post
            </Text>

            <View
              style={[styles.inputWrapper, gelap && styles.inputWrapperDark]}
            >
              <Ionicons
                name="create-outline"
                size={18}
                color={gelap ? "#94A3B8" : COLORS.text.tertiary}
              />
              <TextInput
                style={[styles.input, gelap && styles.inputDark]}
                placeholder="Masukkan judul post"
                placeholderTextColor={gelap ? "#64748B" : COLORS.text.tertiary}
                selectionColor={API_COLOR}
                value={judul}
                onChangeText={setJudul}
              />
            </View>

            <View style={styles.inputMeta}>
              <Text style={[styles.helper, gelap && styles.helperDark]}>
                Dikirim sebagai field title
              </Text>
              <Text style={[styles.counter, gelap && styles.counterDark]}>
                {judul.length} karakter
              </Text>
            </View>

            <Pressable
              style={[
                styles.tombol,
                (!judul || mengirim) && styles.tombolNonaktif,
                (!judul || mengirim) && gelap && styles.tombolNonaktifDark,
              ]}
              onPress={kirimPost}
              disabled={!judul || mengirim}
            >
              {mengirim ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={styles.tombolContent}>
                  <Ionicons name="send" size={17} color="#fff" />
                  <Text style={styles.teks}>Kirim</Text>
                </View>
              )}
            </Pressable>
          </View>

          <View style={[styles.infoCard, gelap && styles.infoCardDark]}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color={gelap ? "#67E8F9" : "#0E7490"}
            />
            <Text style={[styles.infoText, gelap && styles.infoTextDark]}>
              Data akan dikirim ke JSONPlaceholder menggunakan metode POST.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    gap: SPACING.md,
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  card: {
    padding: SPACING.lg,
    backgroundColor: COLORS.background.white,
    borderRadius: BORDER_RADIUS.xxl,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    ...SHADOWS.md,
  },
  cardDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: API_BG,
  },
  iconBadgeDark: {
    backgroundColor: "#164E63",
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
    color: COLORS.text.primary,
  },
  cardTitleDark: {
    color: "#F1F5F9",
  },
  cardSubtitle: {
    marginTop: 2,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
  cardSubtitleDark: {
    color: "#94A3B8",
  },
  label: {
    marginBottom: SPACING.sm,
    fontSize: FONT_SIZES.sm,
    fontWeight: "700",
    color: COLORS.text.primary,
  },
  labelDark: {
    color: "#E2E8F0",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.background.light,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  inputWrapperDark: {
    backgroundColor: "#0F172A",
    borderColor: "#334155",
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
  },
  inputDark: {
    color: "#F1F5F9",
  },
  inputMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  helper: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text.tertiary,
  },
  helperDark: {
    color: "#64748B",
  },
  counter: {
    fontSize: FONT_SIZES.xs,
    fontWeight: "600",
    color: "#0E7490",
  },
  counterDark: {
    color: "#67E8F9",
  },
  tombol: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    paddingHorizontal: SPACING.lg,
    backgroundColor: API_COLOR,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.sm,
  },
  tombolNonaktif: {
    backgroundColor: COLORS.text.tertiary,
    shadowOpacity: 0,
    elevation: 0,
  },
  tombolNonaktifDark: {
    backgroundColor: "#475569",
  },
  tombolContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  teks: {
    fontSize: FONT_SIZES.md,
    fontWeight: "700",
    color: COLORS.text.white,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.sm,
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
    fontSize: FONT_SIZES.sm,
    lineHeight: 18,
    color: "#0E7490",
  },
  infoTextDark: {
    color: "#A5F3FC",
  },
});

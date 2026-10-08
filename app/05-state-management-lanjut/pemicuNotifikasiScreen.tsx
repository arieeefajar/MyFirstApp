import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZES,
  SHADOWS,
  SPACING,
} from "@/constants/tokens";
import { useNotification } from "@/context/NotificationContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

const PESAN_PRESET = [
  "Promo: Diskon 50% semua buku React Native",
  "Pesanan #123 telah dikirim ke alamatmu",
  "Modul baru State Management Lanjut tersedia",
];

export default function PemicuNotifikasiScreen() {
  const router = useRouter();
  const { tambahNotifikasi, jumlahNotifikasi } = useNotification();
  const { gelap } = useTheme();
  const [pesan, setPesan] = useState("");

  const handleKirim = () => {
    if (pesan.trim() === "") return;
    tambahNotifikasi(pesan);
    setPesan("");
  };

  return (
    <View style={[styles.screen, gelap && styles.screenDark]}>
      <ModuleHeader
        title="Pemicu Notifikasi"
        subtitle="Menambah notifikasi baru via NotificationContext"
        category="05. State Management Lanjut"
        color={COLORS.modules.state_lanjut}
        gelap={gelap}
      />
      <View style={styles.container}>
        <Text style={[styles.label, gelap && styles.labelDark]}>
          Tulis pesan sendiri
        </Text>
        <TextInput
          style={[styles.input, gelap && styles.inputDark]}
          placeholder="Ketik pesan notifikasi..."
          placeholderTextColor={COLORS.text.tertiary}
          value={pesan}
          onChangeText={setPesan}
        />
        <Pressable style={styles.kirimBtn} onPress={handleKirim}>
          <Text style={styles.kirimBtnText}>Kirim Notifikasi</Text>
        </Pressable>

        <Text style={[styles.label, gelap && styles.labelDark]}>
          Atau pilih cepat
        </Text>
        <View style={styles.presetWrap}>
          {PESAN_PRESET.map((preset) => (
            <Pressable
              key={preset}
              style={[styles.presetBtn, gelap && styles.presetBtnDark]}
              onPress={() => tambahNotifikasi(preset)}
            >
              <Text
                style={[styles.presetText, gelap && styles.presetTextDark]}
                numberOfLines={2}
              >
                + {preset}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={styles.lihatBtn}
          onPress={() =>
            router.push("/05-state-management-lanjut/daftarNotifikasiScreen")
          }
        >
          <Text style={styles.lihatBtnText}>
            Lihat Daftar ({jumlahNotifikasi}) →
          </Text>
        </Pressable>
      </View>
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
  container: {
    flex: 1,
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginTop: SPACING.sm,
  },
  labelDark: {
    color: "#F1F5F9",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border.light,
    backgroundColor: COLORS.background.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
  },
  inputDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
    color: "#F1F5F9",
  },
  kirimBtn: {
    backgroundColor: COLORS.modules.state,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: "center",
    ...SHADOWS.md,
  },
  kirimBtnText: {
    color: COLORS.text.white,
    fontSize: FONT_SIZES.md,
    fontWeight: "700",
  },
  presetWrap: {
    gap: SPACING.sm,
  },
  presetBtn: {
    backgroundColor: COLORS.background.white,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
  presetBtnDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  presetText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
  presetTextDark: {
    color: "#94A3B8",
  },
  lihatBtn: {
    backgroundColor: COLORS.primary[700],
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: "center",
    marginTop: SPACING.md,
  },
  lihatBtnText: {
    color: COLORS.text.white,
    fontSize: FONT_SIZES.md,
    fontWeight: "700",
  },
});

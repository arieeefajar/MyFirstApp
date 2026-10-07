import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { tambahTugas } from "@/redux/todoSlice";
import { useRouter } from "expo-router";
import ModuleHeader from "../../components/ModuleHeader";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from "@/constants/tokens";

export default function TambahTugasScreen() {
  const [judul, setJudul] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { gelap } = useTheme();

  const handleTambah = () => {
    if (judul.trim() === "") {
      Alert.alert("Error", "Judul tugas wajib diisi");
      return;
    }
    dispatch(tambahTugas(judul.trim()));
    setJudul("");
    Alert.alert("Berhasil", "Tugas ditambahkan", [
      { text: "OK" },
      { text: "Lihat Daftar", onPress: () => router.push("/05-state-management-lanjut/DaftarTugasScreen") },
    ]);
  };

  return (
    <View style={[styles.screen, gelap && styles.screenDark]}>
      <ModuleHeader
        title="Tambah Tugas"
        subtitle="Menyimpan tugas baru ke Redux store"
        category="05. State Management Lanjut"
        color="#8B5CF6"
        gelap={gelap}
      />
      <View style={styles.container}>
        <TextInput
          style={[styles.input, gelap && styles.inputDark]}
          placeholder="Masukkan judul tugas..."
          placeholderTextColor={COLORS.text.tertiary}
          value={judul}
          onChangeText={setJudul}
        />
        <Pressable style={styles.tombol} onPress={handleTambah}>
          <Text style={styles.teksTombol}>Tambah Tugas</Text>
        </Pressable>
        <Pressable
          style={[styles.tombol, styles.tombolSekunder]}
          onPress={() => router.push("/05-state-management-lanjut/DaftarTugasScreen")}
        >
          <Text style={[styles.teksTombol, styles.teksSekunder]}>Lihat Daftar Tugas</Text>
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
    padding: SPACING.xl,
    gap: SPACING.md,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border.light,
    backgroundColor: COLORS.background.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
    ...SHADOWS.sm,
  },
  inputDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
    color: "#F1F5F9",
  },
  tombol: {
    backgroundColor: COLORS.modules.state,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  tombolSekunder: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.modules.state,
  },
  teksTombol: {
    color: COLORS.text.white,
    fontWeight: "bold",
    fontSize: FONT_SIZES.md,
  },
  teksSekunder: {
    color: COLORS.modules.state,
  },
});

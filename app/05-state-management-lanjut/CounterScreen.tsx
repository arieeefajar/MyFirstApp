import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { tambah, kurang, reset } from "@/redux/counterSlice";
import ModuleHeader from "../../components/ModuleHeader";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from "@/constants/tokens";

export default function CounterScreen() {
  const nilai = useSelector((state: RootState) => state.counter.nilai);
  const dispatch = useDispatch<AppDispatch>();
  const { gelap } = useTheme();

  return (
    <View style={[styles.screen, gelap && styles.screenDark]}>
      <ModuleHeader
        title="Redux Counter"
        subtitle="Manajemen state global dengan Redux Toolkit (createSlice)"
        category="05. State Management Lanjut"
        color="#8B5CF6"
        gelap={gelap}
      />
      <View style={styles.container}>
        <Text style={[styles.angka, gelap && styles.angkaDark]}>{nilai}</Text>
        <View style={styles.baris}>
          <Pressable
            onPress={() => dispatch(kurang())}
            style={[styles.tombol, styles.tombolKurang]}
          >
            <Text style={styles.teks}>-</Text>
          </Pressable>
          <Pressable
            onPress={() => dispatch(reset())}
            style={[styles.tombol, styles.tombolReset]}
          >
            <Text style={styles.teks}>Reset</Text>
          </Pressable>
          <Pressable
            onPress={() => dispatch(tambah())}
            style={[styles.tombol, styles.tombolTambah]}
          >
            <Text style={styles.teks}>+</Text>
          </Pressable>
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.xl,
  },
  angka: {
    fontSize: 64,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  angkaDark: {
    color: "#F1F5F9",
  },
  baris: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  tombol: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    minWidth: 60,
    alignItems: "center",
  },
  tombolTambah: {
    backgroundColor: COLORS.modules.state,
  },
  tombolKurang: {
    backgroundColor: COLORS.error,
  },
  tombolReset: {
    backgroundColor: COLORS.text.tertiary,
  },
  teks: {
    color: COLORS.text.white,
    fontWeight: "600",
    fontSize: FONT_SIZES.xl,
  },
});

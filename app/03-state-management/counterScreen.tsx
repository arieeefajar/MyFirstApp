import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ModuleHeader from "../../components/ModuleHeader";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from "@/constants/tokens";

export default function CounterScreen() {
  const [jumlah, setJumlah] = useState(0);

  const handleIncrement = useCallback(() => {
    setJumlah((prev) => prev + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    setJumlah((prev) => prev - 1);
  }, []);

  const handleReset = useCallback(() => {
    setJumlah(0);
  }, []);

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Counter Demo"
        subtitle="Manajemen nilai state numerik dengan hook useState"
        category="03. State Management"
        color={COLORS.modules.state}
      />
      <View style={styles.container}>
        <Text style={styles.angka}>{jumlah}</Text>
        
        <View style={styles.buttonGroup}>
          <Pressable 
            style={[styles.tombol, styles.tombolDecrement]} 
            onPress={handleDecrement}
          >
            <Text style={styles.teks}>-</Text>
          </Pressable>

          <Pressable 
            style={[styles.tombol, styles.tombolReset]} 
            onPress={handleReset}
          >
            <Text style={styles.teksReset}>Reset</Text>
          </Pressable>

          <Pressable 
            style={[styles.tombol, styles.tombolIncrement]} 
            onPress={handleIncrement}
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
    backgroundColor: COLORS.background.light 
  },
  container: { 
    padding: SPACING.xxxl, 
    alignItems: "center", 
    gap: SPACING.xl 
  },
  angka: { 
    fontSize: 64, 
    fontWeight: "bold", 
    color: COLORS.text.primary 
  },
  buttonGroup: {
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
  tombolIncrement: {
    backgroundColor: COLORS.modules.state,
  },
  tombolDecrement: {
    backgroundColor: COLORS.error,
  },
  tombolReset: {
    backgroundColor: COLORS.text.tertiary,
  },
  teks: { 
    color: COLORS.text.white, 
    fontWeight: "600", 
    fontSize: FONT_SIZES.xl 
  },
  teksReset: {
    color: COLORS.text.white,
    fontWeight: "600",
    fontSize: FONT_SIZES.md,
  },
});

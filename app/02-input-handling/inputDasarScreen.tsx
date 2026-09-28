import { useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ModuleHeader from "../../components/ModuleHeader";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from "@/constants/tokens";

export default function InputDasarScreen() {
  const [nama, setNama] = useState("");

  const handleChangeText = useCallback((text: string) => {
    setNama(text);
  }, []);

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Input Dasar"
        subtitle="TextInput dasar dan event onChangeText secara langsung"
        category="02. Input Handling"
        color={COLORS.modules.input}
      />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Masukan nama"
          placeholderTextColor={COLORS.text.tertiary}
          value={nama}
          onChangeText={handleChangeText}
        />
        <Text style={styles.preview}>Preview: {nama || "(kosong)"}</Text>
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
    padding: SPACING.xl 
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
  preview: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
  },
});

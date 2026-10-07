import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { updateField, resetForm } from "@/redux/formSlice";
import ModuleHeader from "../../components/ModuleHeader";
import { useTheme } from "@/context/ThemeContext";
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  BORDER_RADIUS,
  SHADOWS,
} from "@/constants/tokens";

export default function FormScreen() {
  const form = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch<AppDispatch>();
  const { gelap } = useTheme();

  const handleSubmit = () => {
    if (form.nama.trim() === "" || form.email.trim() === "") {
      Alert.alert("Error", "Nama dan email wajib diisi");
      return;
    }
    Alert.alert("Terkirim", `Nama: ${form.nama}\nEmail: ${form.email}`);
    dispatch(resetForm());
  };

  return (
    <View style={[styles.screen, gelap && styles.screenDark]}>
      <ModuleHeader
        title="Redux Form"
        subtitle="Menyimpan input form ke global state dengan Redux slice"
        category="05. State Management Lanjut"
        color="#8B5CF6"
        gelap={gelap}
      />
      <View style={styles.container}>
        <TextInput
          style={[styles.input, gelap && styles.inputDark]}
          placeholder="Nama"
          placeholderTextColor={COLORS.text.tertiary}
          value={form.nama}
          onChangeText={(text) =>
            dispatch(updateField({ field: "nama", value: text }))
          }
        />
        <TextInput
          style={[styles.input, gelap && styles.inputDark]}
          placeholder="Email"
          placeholderTextColor={COLORS.text.tertiary}
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(text) =>
            dispatch(updateField({ field: "email", value: text }))
          }
        />
        <Pressable style={styles.tombol} onPress={handleSubmit}>
          <Text style={styles.teks}>Kirim</Text>
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
    backgroundColor: COLORS.primary[700],
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  teks: {
    color: COLORS.text.white,
    fontWeight: "bold",
    fontSize: FONT_SIZES.md,
  },
});

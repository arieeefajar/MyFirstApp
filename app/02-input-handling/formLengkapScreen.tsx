import { useCallback, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ModuleHeader from "../../components/ModuleHeader";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from "@/constants/tokens";

interface FormData {
  nama: string;
  email: string;
}

export default function FormLengkapScreen() {
  const [form, setForm] = useState<FormData>({ nama: "", email: "" });

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const bolehKirim = form.nama.trim() !== "" && form.email.includes("@");

  const handleSubmit = useCallback(() => {
    Alert.alert("Berhasil", `Nama: ${form.nama}\nEmail: ${form.email}`);
    setForm({ nama: "", email: "" }); // reset setelah submit
  }, [form]);

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Form Lengkap"
        subtitle="Formulir multi-input dengan validasi kesiapan kirim"
        category="02. Input Handling"
        color={COLORS.modules.input}
      />
      <View style={styles.container}>
        <Text style={styles.label}>Nama</Text>
        <TextInput
          style={styles.input}
          placeholder="Ketik nama"
          placeholderTextColor={COLORS.text.tertiary}
          value={form.nama}
          onChangeText={(text) => updateField("nama", text)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Ketik email"
          placeholderTextColor={COLORS.text.tertiary}
          value={form.email}
          onChangeText={(text) => updateField("email", text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Pressable
          style={[styles.tombol, !bolehKirim && styles.tombolDisabled]}
          onPress={handleSubmit}
          disabled={!bolehKirim}
        >
          <Text style={styles.teks}>Kirim</Text>
        </Pressable>
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
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    marginBottom: SPACING.sm,
    color: COLORS.text.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border.light,
    backgroundColor: COLORS.background.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZES.md,
    marginBottom: SPACING.lg,
    color: COLORS.text.primary,
    ...SHADOWS.sm,
  },
  tombol: {
    backgroundColor: COLORS.modules.input,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    marginTop: SPACING.md,
  },
  tombolDisabled: {
    backgroundColor: COLORS.text.tertiary,
    opacity: 0.5,
  },
  teks: { 
    color: COLORS.text.white, 
    fontWeight: "600", 
    fontSize: FONT_SIZES.lg 
  },
});

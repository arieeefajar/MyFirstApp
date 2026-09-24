import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

export default function FormLengkapScreen() {
  const [form, setForm] = useState({ nama: "", email: "" });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const bolehKirim = form.nama.trim() !== "" && form.email.includes("@");

  const handleSubmit = () => {
    Alert.alert("Berhasil", `Nama: ${form.nama}\nEmail: ${form.email}`);
    setForm({ nama: "", email: "" }); // reset setelah submit
  };

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Form Lengkap"
        subtitle="Formulir multi-input dengan validasi kesiapan kirim"
        category="02. Input Handling"
        color="#0EA5E9"
      />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nama"
          value={form.nama}
          onChangeText={(text) => updateField("nama", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChangeText={(text) => updateField("email", text)}
        />
        <Pressable
          style={[styles.tombol, !bolehKirim && styles.tombolNonaktif]}
          onPress={handleSubmit}
          disabled={!bolehKirim}
        >
          <Text style={styles.teksTombol}>Simpan</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { padding: 20, gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  tombol: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  tombolNonaktif: { backgroundColor: "#90CAF9" },
  teksTombol: { color: "#fff", fontWeight: "600" },
});

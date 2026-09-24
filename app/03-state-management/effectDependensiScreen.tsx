import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

export default function EfekDependensiScreen() {
  const [kata, setKata] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (kata.length === 0) {
      setStatus("");
    } else if (kata.length < 3) {
      setStatus("Terlalu pendek");
    } else {
      setStatus("Valid ✓");
    }
  }, [kata]); // dijalankan ulang setiap "kata" berubah

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Effect Dependensi"
        subtitle="Validasi status reaktif menggunakan dependensi variabel pada useEffect"
        category="03. State Management"
        color="#10B981"
      />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Ketik sesuatu..."
          value={kata}
          onChangeText={setKata}
        />
        <Text style={styles.status}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { padding: 20, gap: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  status: { fontSize: 15, fontWeight: "600", color: "#10B981" },
});

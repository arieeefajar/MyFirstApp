import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

export default function EffectDasarScreen() {
  const [pencarian, setPencarian] = useState("");
  const [jumlahKarakter, setJumlahKarakter] = useState(0);

  useEffect(() => {
    console.log("Pencarian berubah menjadi:", pencarian);
    setJumlahKarakter(pencarian.length);
  }, [pencarian]); // dijalankan setiap kali "pencarian" berubah

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Effect Dasar"
        subtitle="Lifecycle useEffect yang aktif setiap kali nilai dependensi berubah"
        category="03. State Management"
        color="#10B981"
      />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Cari..."
          value={pencarian}
          onChangeText={setPencarian}
        />
        <Text style={styles.resultText}>Jumlah karakter: {jumlahKarakter}</Text>
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
    backgroundColor: "#fff",
  },
  resultText: { fontSize: 14, color: "#475569", fontWeight: "500" },
});

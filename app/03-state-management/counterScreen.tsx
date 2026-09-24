import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

export default function CounterScreen() {
  const [jumlah, setJumlah] = useState(0);

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Counter Demo"
        subtitle="Manajemen nilai state numerik dengan hook useState"
        category="03. State Management"
        color="#10B981"
      />
      <View style={styles.container}>
        <Text style={styles.angka}>{jumlah}</Text>
        <Pressable style={styles.tombol} onPress={() => setJumlah(jumlah + 1)}>
          <Text style={styles.teks}>Tambah</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { padding: 32, alignItems: "center", gap: 16 },
  angka: { fontSize: 48, fontWeight: "bold", color: "#0F172A" },
  tombol: {
    backgroundColor: "#10B981",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  teks: { color: "#fff", fontWeight: "600", fontSize: 16 },
});

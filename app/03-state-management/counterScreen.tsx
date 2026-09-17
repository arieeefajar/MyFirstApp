import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function CounterScreen() {
  const [jumlah, setJumlah] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.angka}>{jumlah}</Text>
      <Pressable style={styles.tombol} onPress={() => setJumlah(jumlah + 1)}>
        <Text style={styles.teks}>Tambah</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center", gap: 12 },
  angka: { fontSize: 32, fontWeight: "bold" },
  tombol: { backgroundColor: "#2196F3", padding: 12, borderRadius: 8 },
  teks: { color: "#fff", fontWeight: "600" },
});

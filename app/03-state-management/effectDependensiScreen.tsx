import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ketik sesuatu..."
        value={kata}
        onChangeText={setKata}
      />
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 8 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12 },
  status: { fontSize: 14, color: "#2196F3" },
});

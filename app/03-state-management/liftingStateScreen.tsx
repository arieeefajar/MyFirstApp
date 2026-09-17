import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

// Komponen anak 1 - hanya menerima props, tidak punya state sendiri
function InputNama({ nilai, onUbah }) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Ketik nama..."
      value={nilai}
      onChangeText={onUbah}
    />
  );
}

// Komponen anak 2 - hanya menampilkan, tidak punya state sendiri
function TampilanSapaan({ nama }) {
  return <Text style={styles.sapaan}>Halo, {nama || "..."}!</Text>;
}

// Komponen induk - pemilik state
export default function LiftingStateScreen() {
  const [nama, setNama] = useState("");

  return (
    <View style={styles.container}>
      <InputNama nilai={nama} onUbah={setNama} />
      <TampilanSapaan nama={nama} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12 },
  sapaan: { fontSize: 18, fontWeight: "600" },
});

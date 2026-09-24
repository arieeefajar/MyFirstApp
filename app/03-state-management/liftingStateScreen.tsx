import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

// Komponen anak 1 - hanya menerima props, tidak punya state sendiri
function InputNama({ nilai, onUbah }: { nilai: string; onUbah: (text: string) => void }) {
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
function TampilanSapaan({ nama }: { nama: string }) {
  return <Text style={styles.sapaan}>Halo, {nama || "..."}!</Text>;
}

// Komponen induk - pemilik state
export default function LiftingStateScreen() {
  const [nama, setNama] = useState("");

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Lifting State"
        subtitle="Mengangkat state ke komponen induk untuk sinkronisasi child"
        category="03. State Management"
        color="#10B981"
      />
      <View style={styles.container}>
        <InputNama nilai={nama} onUbah={setNama} />
        <TampilanSapaan nama={nama} />
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
  sapaan: { fontSize: 18, fontWeight: "600", color: "#1E293B" },
});

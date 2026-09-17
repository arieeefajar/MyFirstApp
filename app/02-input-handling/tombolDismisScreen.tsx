import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function TombolDinamisScreen() {
  const [pesan, setPesan] = useState("");
  const bolehKirim = pesan.trim().length > 0;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tulis pesan..."
        value={pesan}
        onChangeText={setPesan}
        multiline
      />
      <Pressable
        style={[styles.tombol, !bolehKirim && styles.tombolNonaktif]}
        onPress={() => {
          console.log("Terkirim:", pesan);
          setPesan("");
        }}
        disabled={!bolehKirim}
      >
        <Text style={styles.teksTombol}>Kirim Pesan</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    minHeight: 80,
    textAlignVertical: "top",
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

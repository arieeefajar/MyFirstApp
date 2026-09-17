import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function InputDasarScreen() {
  const [nama, setNama] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Masukan nama"
        value={nama}
        onChangeText={setNama}
      />
      <Text style={styles.preview}>Preview: {nama}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
  },
  preview: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
  },
});

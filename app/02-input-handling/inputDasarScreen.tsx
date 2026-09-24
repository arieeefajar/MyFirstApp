import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

export default function InputDasarScreen() {
  const [nama, setNama] = useState("");

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Input Dasar"
        subtitle="TextInput dasar dan event onChangeText secara langsung"
        category="02. Input Handling"
        color="#0EA5E9"
      />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Masukan nama"
          value={nama}
          onChangeText={setNama}
        />
        <Text style={styles.preview}>Preview: {nama}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
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

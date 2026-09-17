import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function FormSederhanaScreen() {
  const [nama, setNama] = useState("");

  const handleSubmit = () => {
    Alert.alert("Data terkirim", `Nama: ${nama}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Masukan nama"
        value={nama}
        onChangeText={setNama}
      />

      <Pressable style={styles.tombol} onPress={handleSubmit}>
        <Text style={styles.teksTombol}>Kirim</Text>
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
  },
  tombol: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
  },
  teksTombol: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
  },
});

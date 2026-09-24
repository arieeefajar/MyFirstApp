import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

export default function FormSederhanaScreen() {
  const [nama, setNama] = useState("");

  const handleSubmit = () => {
    Alert.alert("Data terkirim", `Nama: ${nama}`);
  };

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Form Sederhana"
        subtitle="Menangani input formulir dan event submit data"
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

        <Pressable style={styles.tombol} onPress={handleSubmit}>
          <Text style={styles.teksTombol}>Kirim</Text>
        </Pressable>
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
    backgroundColor: "#fff",
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

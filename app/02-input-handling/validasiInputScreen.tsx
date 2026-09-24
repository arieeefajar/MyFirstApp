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

export default function ValidasiInputScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (email.trim() === "") {
      setError("Email tidak boleh kosong");
      return;
    }
    if (!email.includes("@")) {
      setError("Format email tidak valid");
      return;
    }
    setError("");
    Alert.alert("Berhasil", `Email: ${email}`);
    console.log("Email valid:", email);
  };

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Validasi Input"
        subtitle="Validasi format email dengan peringatan visual error"
        category="02. Input Handling"
        color="#0EA5E9"
      />
      <View style={styles.container}>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder="Masukkan email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (error) setError(""); // hapus error saat user mulai mengetik ulang
          }}
        />
        {error !== "" && <Text style={styles.pesanError}>{error}</Text>}

        <Pressable style={styles.tombol} onPress={handleSubmit}>
          <Text style={styles.teksTombol}>Daftar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { padding: 20, gap: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  inputError: { borderColor: "#E53935" },
  pesanError: { color: "#E53935", fontSize: 13 },
  tombol: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    margin: 10,
  },
  teksTombol: { color: "#fff", fontWeight: "600" },
});

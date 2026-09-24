import { Picker } from "@react-native-picker/picker";
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

const daftarKategori = [
  { label: "Fiksi", value: "Fiksi" },
  { label: "Non-Fiksi", value: "Non-Fiksi" },
  { label: "Sains", value: "Sains" },
  { label: "Teknologi", value: "Teknologi" },
];

export default function TambahBukuScreen() {
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("Fiksi");

  const isFormValid = judul.trim().length > 0;

  const handleSimpan = () => {
    Alert.alert(
      "Buku Berhasil Disimpan",
      `Judul: ${judul}\nKategori: ${kategori}`,
    );
  };

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Tambah Buku"
        subtitle="Form kombinasi TextInput dan Picker kategori buku"
        category="02. Input Handling"
        color="#0EA5E9"
      />
      <View style={styles.container}>
        <Text style={styles.label}>Judul Buku</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan judul buku..."
          value={judul}
          onChangeText={setJudul}
        />

        <Text style={styles.label}>Kategori Buku</Text>
        <View style={styles.pickerBox}>
          <Picker selectedValue={kategori} onValueChange={setKategori}>
            {daftarKategori.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>

        <Pressable
          style={[styles.tombol, !isFormValid && styles.tombolDisabled]}
          disabled={!isFormValid}
          onPress={handleSimpan}
        >
          <Text style={styles.teksTombol}>Simpan</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  container: {
    padding: 20,
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  tombol: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  tombolDisabled: {
    backgroundColor: "#a6cbe8",
  },
  teksTombol: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

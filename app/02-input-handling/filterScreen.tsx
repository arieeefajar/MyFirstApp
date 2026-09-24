import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

const kategoriList = [
  { label: "Semua", value: "all" },
  { label: "Fiksi", value: "fiksi" },
  { label: "Sains", value: "sains" },
];

export default function FilterScreen() {
  const [kategori, setKategori] = useState("all");

  const terapkanFilter = () => {
    Alert.alert("Filter diterapkan", `Kategori: ${kategori}`);
  };

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Filter Kategori"
        subtitle="Pemilihan nilai filter dan penerapan aksi pada data"
        category="02. Input Handling"
        color="#0EA5E9"
      />
      <View style={styles.container}>
        <View style={styles.pickerBox}>
          <Picker selectedValue={kategori} onValueChange={setKategori}>
            {kategoriList.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>
        <Pressable style={styles.tombol} onPress={terapkanFilter}>
          <Text style={styles.teksTombol}>Terapkan Filter</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { padding: 20, gap: 12 },
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
  },
  teksTombol: { color: "#fff", fontWeight: "600" },
});

import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

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
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  tombol: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  teksTombol: { color: "#fff", fontWeight: "600" },
});

import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const daftarKategori = [
  { label: "Semua Kategori", value: "all" },
  { label: "Fiksi", value: "fiksi" },
  { label: "Non-Fiksi", value: "nonfiksi" },
  { label: "Sains", value: "sains" },
];

export default function PickerDinamisScreen() {
  const [kategori, setKategori] = useState("all");

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
});

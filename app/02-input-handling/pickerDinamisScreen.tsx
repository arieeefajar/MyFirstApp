import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

const daftarKategori = [
  { label: "Semua Kategori", value: "all" },
  { label: "Fiksi", value: "fiksi" },
  { label: "Non-Fiksi", value: "nonfiksi" },
  { label: "Sains", value: "sains" },
];

export default function PickerDinamisScreen() {
  const [kategori, setKategori] = useState("all");

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Picker Dinamis"
        subtitle="Rendering opsi item dropdown secara dinamis dari array"
        category="02. Input Handling"
        color="#0EA5E9"
      />
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { padding: 20 },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
});

import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PickerDasarScreen() {
  const [provinsi, setProvinsi] = useState("jabar");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Pilih Provinsi</Text>
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={provinsi}
          onValueChange={(itemValue) => setProvinsi(itemValue)}
        >
          <Picker.Item label="Jawa Barat" value="jabar" />
          <Picker.Item label="Jawa Tengah" value="jateng" />
          <Picker.Item label="Jawa Timur" value="jatim" />
          <Picker.Item label="DKI Jakarta" value="jakarta" />
        </Picker>
      </View>
      <Text style={styles.preview}>Dipilih: {provinsi}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 14, marginBottom: 6, color: "#333" },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  preview: { marginTop: 12, fontSize: 14, color: "#666" },
});

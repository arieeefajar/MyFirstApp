import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function EffectDasarScreen() {
  const [pencarian, setPencarian] = useState("");
  const [jumlahKarakter, setJumlahKarakter] = useState(0);

  useEffect(() => {
    console.log("Pencarian berubah menjadi:", pencarian);
    setJumlahKarakter(pencarian.length);
  }, [pencarian]); // dijalankan setiap kali "pencarian" berubah

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Cari..."
        value={pencarian}
        onChangeText={setPencarian}
      />
      <Text>Jumlah karakter: {jumlahKarakter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 8 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12 },
});

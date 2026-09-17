import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function EfekSekaliScreen() {
  const [pesan, setPesan] = useState("Memuat...");

  useEffect(() => {
    console.log("Komponen pertama kali muncul");
    setPesan("Selamat datang di aplikasi!");
  }, []); // array kosong = hanya sekali saat mount

  return (
    <View style={styles.container}>
      <Text style={styles.teks}>{pesan}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  teks: { fontSize: 16 },
});

import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

export default function EfekSekaliScreen() {
  const [pesan, setPesan] = useState("Memuat...");

  useEffect(() => {
    console.log("Komponen pertama kali muncul");
    setPesan("Selamat datang di aplikasi!");
  }, []); // array kosong = hanya sekali saat mount

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Effect Sekali (Mount)"
        subtitle="useEffect dengan dependency array kosong dijalankan hanya saat komponen mount"
        category="03. State Management"
        color="#10B981"
      />
      <View style={styles.container}>
        <Text style={styles.teks}>{pesan}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { padding: 24, alignItems: "center", justifyContent: "center", marginTop: 40 },
  teks: { fontSize: 18, fontWeight: "600", color: "#10B981" },
});

import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

export default function DetailBukuScreen() {
  const { judul } = useLocalSearchParams<{ judul: string }>();

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Detail Buku"
        subtitle="Menerima dan membaca parameter judul dari halaman sebelumnya"
        category="04. Navigation & Routing"
        color="#F59E0B"
      />
      <View style={styles.container}>
        <Text style={styles.label}>Judul Buku:</Text>
        <Text style={styles.judul}>{judul ?? "Tidak ada judul"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { flex: 1, padding: 20 },
  label: { fontSize: 14, color: "#64748B", fontWeight: "500" },
  judul: { fontSize: 24, fontWeight: "bold", marginTop: 6, color: "#0F172A" },
});

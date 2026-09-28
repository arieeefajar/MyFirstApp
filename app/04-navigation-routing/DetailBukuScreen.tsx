import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

export default function DetailBukuScreen() {
  const { judul, penulis } = useLocalSearchParams<{ judul?: string; penulis?: string }>();

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Detail Buku"
        subtitle="Menerima dan membaca parameter dari halaman sebelumnya"
        category="04. Navigation & Routing"
        color="#F59E0B"
      />
      <View style={styles.container}>
        <View style={styles.infoSection}>
          <Text style={styles.label}>Judul Buku:</Text>
          <Text style={styles.value}>{judul ?? "Tidak ada judul"}</Text>
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.label}>Penulis:</Text>
          <Text style={styles.value}>{penulis ?? "Tidak ada penulis"}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { flex: 1, padding: 20 },
  infoSection: {
    marginBottom: 20,
  },
  label: { 
    fontSize: 14, 
    color: "#64748B", 
    fontWeight: "500",
    marginBottom: 6,
  },
  value: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#0F172A",
  },
});

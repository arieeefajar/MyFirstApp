import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

export default function DaftarBukuScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Daftar Buku"
        subtitle="Eksplorasi navigasi halaman dan pengiriman parameter rute"
        category="04. Navigation & Routing"
        color="#F59E0B"
      />
      <View style={styles.container}>
        <Pressable
          style={styles.tombol}
          onPress={() =>
            router.push({
              pathname: "/04-navigation-routing/DetailBukuScreen",
              params: { judul: "Pemrograman React Native" },
            })
          }
        >
          <Text style={styles.teks}>Lihat Detail Buku</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { flex: 1, padding: 20 },
  tombol: {
    backgroundColor: "#F59E0B",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  teks: { color: "#fff", fontWeight: "600", fontSize: 16 },
});

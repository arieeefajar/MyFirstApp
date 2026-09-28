import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from "react-native";
import ModuleHeader from "../../components/ModuleHeader";
import { DATA_BUKU } from "./data";
import { Buku } from "./types";

export default function DaftarBukuScreen() {
  const router = useRouter();

  const handleBukuPress = useCallback((buku: Buku) => {
    router.push({
      pathname: "./DetailBukuScreen",
      params: { 
        judul: buku.judul,
        penulis: buku.penulis
      },
    });
  }, [router]);

  const renderItemBuku: ListRenderItem<Buku> = useCallback(({ item }) => (
    <Pressable
      style={styles.bukuCard}
      onPress={() => handleBukuPress(item)}
    >
      <View style={styles.bukuInfo}>
        <Text style={styles.bukuJudul}>{item.judul}</Text>
        <Text style={styles.bukuPenulis}>oleh {item.penulis}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  ), [handleBukuPress]);

  const keyExtractor = useCallback((item: Buku) => item.id, []);

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Daftar Buku"
        subtitle="Eksplorasi navigasi halaman dan pengiriman parameter rute"
        category="04. Navigation & Routing"
        color="#F59E0B"
      />
      <View style={styles.container}>
        <FlatList
          data={DATA_BUKU}
          renderItem={renderItemBuku}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { flex: 1, padding: 20 },
  listContent: {
    gap: 12,
  },
  bukuCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  bukuInfo: {
    flex: 1,
  },
  bukuJudul: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 4,
  },
  bukuPenulis: {
    fontSize: 14,
    color: "#64748B",
  },
  arrow: {
    fontSize: 24,
    color: "#F59E0B",
    fontWeight: "300",
    marginLeft: 12,
  },
});

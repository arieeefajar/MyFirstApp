import ModuleHeader from "@/components/ModuleHeader";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from "react-native";
import { DATA_MAHASISWA } from "./data";
import { Mahasiswa } from "./types";

export default function DaftarMahasiswaScreen() {
  const router = useRouter();

  const handleMahasiswaPress = useCallback(
    (mahasiswa: Mahasiswa) => {
      router.push({
        pathname: "./DetailMahasiswaScreen",
        params: {
          nama: mahasiswa.nama,
          nim: mahasiswa.nim,
        },
      });
    },
    [router],
  );

  const renderItemMahasiswa: ListRenderItem<Mahasiswa> = useCallback(
    ({ item }) => (
      <Pressable
        style={styles.mahasiswaCard}
        onPress={() => handleMahasiswaPress(item)}
      >
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.nama.charAt(0).toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.mahasiswaInfo}>
          <Text style={styles.mahasiswaNama}>{item.nama}</Text>
          <Text style={styles.mahasiswaNim}>NIM: {item.nim}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>›</Text>
        </View>
      </Pressable>
    ),
    [handleMahasiswaPress],
  );

  const keyExtractor = useCallback((item: Mahasiswa) => item.id, []);

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Daftar Mahasiswa"
        subtitle="Chalenge navigasi halaman dan pengiriman paramter rute"
        category="04. Navigation & Routeing"
        color="#F59E0B"
      />

      <View style={styles.container}>
        <FlatList
          data={DATA_MAHASISWA}
          keyExtractor={keyExtractor}
          renderItem={renderItemMahasiswa}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: "#EEF2FF" 
  },
  container: { 
    flex: 1, 
    padding: 16 
  },
  listContent: {
    gap: 16,
    paddingBottom: 20,
  },
  mahasiswaCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#6366F1",
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  mahasiswaInfo: {
    flex: 1,
  },
  mahasiswaNama: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E1B4B",
    marginBottom: 4,
  },
  mahasiswaNim: {
    fontSize: 13,
    color: "#6366F1",
    fontWeight: "500",
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    fontSize: 20,
    color: "#6366F1",
    fontWeight: "600",
  },
});

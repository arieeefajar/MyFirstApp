import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const dataLaguAwal = [
  { id: "1", judul: "Bohemian Rhapsody", artist: "Queen", selesai: false },
  {
    id: "2",
    judul: "Bat Country",
    artist: "Avenged Sevenfold",
    selesai: false,
  },
  { id: "3", judul: "Chop Suey", artist: "System of a Down", selesai: false },
  { id: "4", judul: "November Rain", artist: "Guns N' Roses", selesai: false },
  { id: "5", judul: "Hotel California", artist: "Eagles", selesai: false },
  {
    id: "6",
    judul: "Stairway to Heaven",
    artist: "Led Zeppelin",
    selesai: false,
  },
  { id: "7", judul: "Sad Statue", artist: "System of a Down", selesai: false },
  { id: "8", judul: "Basket Case", artist: "Green Day", selesai: false },
  {
    id: "9",
    judul: "Boulevard of Broken Dreams",
    artist: "Green Day",
    selesai: false,
  },
  { id: "10", judul: "Psychosocial", artist: "Slipknot", selesai: false },
];

export default function DaftarLaguScreen() {
  const [lagu, setLagu] = useState(dataLaguAwal);
  const [judulInput, setJudulInput] = useState("");
  const [artistInput, setArtistInput] = useState("");

  const isInputInvalid = judulInput.trim() === "" || artistInput.trim() === "";

  const toggleSelesai = (id: string) => {
    setLagu((prev) =>
      prev.map((t) => (t.id === id ? { ...t, selesai: !t.selesai } : t)),
    );
  };

  const tambahLagu = () => {
    if (isInputInvalid) return;

    const laguBaru = {
      id: Date.now().toString(),
      judul: judulInput.trim(),
      artist: artistInput.trim(),
      selesai: false,
    };

    setLagu((prev) => [laguBaru, ...prev]);

    setJudulInput("");
    setArtistInput("");
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.headerTitle}>🎵 Playlist Favorit</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Judul Lagu..."
          placeholderTextColor="#64748B"
          value={judulInput}
          onChangeText={setJudulInput}
        />
        <TextInput
          style={styles.input}
          placeholder="Nama Artist / Band..."
          placeholderTextColor="#64748B"
          value={artistInput}
          onChangeText={setArtistInput}
        />

        <Pressable
          disabled={isInputInvalid}
          style={({ pressed }) => [
            styles.btnTambah,
            isInputInvalid && styles.btnDisabled,
            pressed && !isInputInvalid && styles.itemPressed,
          ]}
          onPress={tambahLagu}
        >
          <Text
            style={[
              styles.teksBtnTambah,
              isInputInvalid && styles.teksBtnDisabled,
            ]}
          >
            + Tambah Lagu
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={lagu}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.garis} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Pressable
            style={({ pressed }) => [
              styles.itemCard,
              item.selesai && styles.itemCardSelesai,
              pressed && styles.itemPressed,
            ]}
            onPress={() => toggleSelesai(item.id)}
          >
            <View
              style={[
                styles.badgeNomor,
                item.selesai && styles.badgeNomorSelesai,
              ]}
            >
              <Text
                style={[
                  styles.teksNomor,
                  item.selesai && styles.teksNomorSelesai,
                ]}
              >
                {index + 1}
              </Text>
            </View>

            <View style={styles.infoContainer}>
              <Text
                numberOfLines={1}
                style={[styles.teksJudul, item.selesai && styles.teksCoret]}
              >
                {item.judul}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.teksArtist,
                  item.selesai && styles.teksArtistSelesai,
                ]}
              >
                {item.artist}
              </Text>
            </View>

            <View style={styles.checkboxWrapper}>
              <Text
                style={[
                  styles.checkboxIcon,
                  item.selesai && styles.checkboxIconAktif,
                ]}
              >
                {item.selesai ? "✓" : "○"}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#F8FAFC",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  input: {
    backgroundColor: "#1E293B",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#F8FAFC",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#334155",
  },
  btnTambah: {
    backgroundColor: "#38BDF8",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnDisabled: {
    backgroundColor: "#334155",
  },
  teksBtnTambah: {
    color: "#0F172A",
    fontWeight: "700",
    fontSize: 14,
  },
  teksBtnDisabled: {
    color: "#64748B",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#1E293B",
    gap: 14,
  },
  itemCardSelesai: {
    backgroundColor: "rgba(30, 41, 59, 0.4)",
  },
  itemPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  badgeNomor: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#334155",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeNomorSelesai: {
    backgroundColor: "#1E293B",
  },
  teksNomor: {
    fontSize: 13,
    fontWeight: "700",
    color: "#38BDF8",
  },
  teksNomorSelesai: {
    color: "#64748B",
  },
  infoContainer: {
    flex: 1,
  },
  teksJudul: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 2,
  },
  teksArtist: {
    fontSize: 13,
    fontWeight: "500",
    color: "#94A3B8",
  },
  teksArtistSelesai: {
    color: "#475569",
  },
  teksCoret: {
    textDecorationLine: "line-through",
    color: "#64748B",
  },
  checkboxWrapper: {
    paddingLeft: 4,
  },
  checkboxIcon: {
    fontSize: 18,
    color: "#475569",
    fontWeight: "bold",
  },
  checkboxIconAktif: {
    color: "#38BDF8",
  },
  garis: {
    height: 8,
  },
});

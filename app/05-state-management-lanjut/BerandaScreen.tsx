import { Pressable, StyleSheet, Text, View } from "react-native";

export default function BerandaScreen() {
  return (
    <View>
      <Text>Tema saat ini:</Text>
      <Pressable>
        <Text>Ganti Tema</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  containerGelap: { backgroundColor: "#1a1a1a" },
  text: { fontSize: 16, color: "#1a1a1a", marginBottom: 12 },
  teksGelap: { color: "#fff" },
  tombol: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  teksTombol: { color: "#fff", fontWeight: "600" },
});

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFavorite } from "../../context/FavoriteContext";

export default function FavoriteListScreen() {
  const { favorites, toggleFavorite } = useFavorite();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Belum ada buku favorit yang ditambahkan.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>{item.author}</Text>
              </View>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => toggleFavorite(item)}
              >
                <Text style={styles.removeBtnText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F9FAFB" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "#9CA3AF", fontSize: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  author: { fontSize: 14, color: "#6B7280" },
  removeBtn: { backgroundColor: "#EF4444", padding: 8, borderRadius: 6 },
  removeBtnText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});

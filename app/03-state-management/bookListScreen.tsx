import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Book, useFavorite } from "../../context/FavoriteContext";

const BOOKS_DATA: Book[] = [
  { id: "1", title: "React Native for Beginners", author: "Expo Team" },
  { id: "2", title: "Mastering TypeScript", author: "Jane Doe" },
  { id: "3", title: "State Management Guide", author: "John Smith" },
  { id: "4", title: "UI/UX Mobile Design", author: "Sarah Connor" },
];

export default function BookListScreen() {
  const router = useRouter();
  const { toggleFavorite, isFavorite, favorites } = useFavorite();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headerBtn}
        onPress={() => router.push("/03-state-management/favoriteListScreen")}
      >
        <Text style={styles.headerBtnText}>
          Lihat Favorit ({favorites.length}) →
        </Text>
      </TouchableOpacity>

      <FlatList
        data={BOOKS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const active = isFavorite(item.id);
          return (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>{item.author}</Text>
              </View>

              <TouchableOpacity
                style={[styles.favBtn, active && styles.favBtnActive]}
                onPress={() => toggleFavorite(item)}
              >
                <Text
                  style={[styles.favBtnText, active && styles.favBtnTextActive]}
                >
                  {active ? "❤️ Favorit" : "🤍 Tambah"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F9FAFB" },
  headerBtn: {
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  headerBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
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
  favBtn: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 8,
    borderRadius: 6,
  },
  favBtnActive: { backgroundColor: "#FEE2E2", borderColor: "#EF4444" },
  favBtnText: { fontSize: 12, color: "#374151" },
  favBtnTextActive: { color: "#DC2626", fontWeight: "bold" },
});

import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ModuleHeader from "../../components/ModuleHeader";
import { CartItem, useCart } from "@/context/CartContext";

const daftarProduk: CartItem[] = [
  { id: "1", nama: "Buku React Native", harga: 85000 },
  { id: "2", nama: "Buku JavaScript", harga: 75000 },
  { id: "3", nama: "Buku TypeScript", harga: 95000 },
  { id: "4", nama: "Buku UI/UX Mobile", harga: 65000 },
];

function formatRupiah(nominal: number) {
  return "Rp" + nominal.toLocaleString("id-ID");
}

export default function ProdukScreen() {
  const router = useRouter();
  const { items, tambahItem } = useCart();

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Daftar Produk"
        subtitle="Menambah produk ke keranjang global dengan CartContext"
        category="03. State Management"
        color="#10B981"
      />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => router.push("/03-state-management/keranjangScreen")}
        >
          <Text style={styles.headerBtnText}>
            Lihat Keranjang ({items.length}) →
          </Text>
        </TouchableOpacity>

        <FlatList
          data={daftarProduk}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.nama}</Text>
                <Text style={styles.price}>{formatRupiah(item.harga)}</Text>
              </View>

              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => tambahItem(item)}
              >
                <Text style={styles.addBtnText}>+ Keranjang</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
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
  price: { fontSize: 14, color: "#10B981", fontWeight: "600", marginTop: 4 },
  addBtn: {
    backgroundColor: "#10B981",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addBtnText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});

import { useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ModuleHeader from "../../components/ModuleHeader";
import { CartItem, useCart } from "@/context/CartContext";

function formatRupiah(nominal: number) {
  return "Rp" + nominal.toLocaleString("id-ID");
}

interface GroupedItem extends CartItem {
  jumlah: number;
}

export default function KeranjangScreen() {
  const { items, tambahItem, kurangItem, hapusItem } = useCart();

  const groupedItems: GroupedItem[] = useMemo(() => {
    const map = new Map<string, GroupedItem>();
    items.forEach((item) => {
      const existing = map.get(item.id);
      if (existing) {
        existing.jumlah += 1;
      } else {
        map.set(item.id, { ...item, jumlah: 1 });
      }
    });
    return Array.from(map.values());
  }, [items]);

  const totalJumlah = groupedItems.reduce((total, item) => total + item.jumlah, 0);
  const totalHarga = items.reduce((total, item) => total + item.harga, 0);

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Keranjang Belanja"
        subtitle="Membaca dan menghapus data dari CartContext"
        category="03. State Management"
        color="#10B981"
      />
      <View style={styles.container}>
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Keranjang masih kosong.</Text>
            <Text style={styles.emptySubText}>
              Tambahkan produk dari halaman Daftar Produk.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.totalBox}>
              <Text style={styles.totalLabel}>
                Total ({groupedItems.length} produk, {totalJumlah} item)
              </Text>
              <Text style={styles.totalValue}>
                {formatRupiah(totalHarga)}
              </Text>
            </View>

            <FlatList
              data={groupedItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <View style={styles.cardContent}>
                    <Text style={styles.title}>{item.nama}</Text>
                    <Text style={styles.price}>
                      {formatRupiah(item.harga)}
                    </Text>
                    <View style={styles.qtyRow}>
                      <View style={styles.qtyControl}>
                        <TouchableOpacity
                          style={styles.qtyBtn}
                          onPress={() => kurangItem(item.id)}
                        >
                          <Text style={styles.qtyBtnText}>−</Text>
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{item.jumlah}</Text>
                        <TouchableOpacity
                          style={styles.qtyBtn}
                          onPress={() =>
                            tambahItem({
                              id: item.id,
                              nama: item.nama,
                              harga: item.harga,
                            })
                          }
                        >
                          <Text style={styles.qtyBtnText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text style={styles.subtotalText}>
                      Subtotal: {formatRupiah(item.harga * item.jumlah)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => hapusItem(item.id)}
                  >
                    <Text style={styles.removeBtnText}>Hapus</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { flex: 1, padding: 16, backgroundColor: "#F9FAFB" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  emptyText: { color: "#374151", fontSize: 16, fontWeight: "bold" },
  emptySubText: { color: "#9CA3AF", fontSize: 14 },
  totalBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
  },
  totalLabel: { fontSize: 14, color: "#6B7280" },
  totalValue: { fontSize: 18, fontWeight: "bold", color: "#10B981" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 14, color: "#10B981", fontWeight: "600", marginTop: 4 },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#D1FAE5",
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
    gap: 4,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyBtnText: { fontSize: 16, fontWeight: "bold", color: "#fff", lineHeight: 18 },
  qtyText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#047857",
    minWidth: 24,
    textAlign: "center",
  },
  subtotalText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 6,
    flexShrink: 1,
  },
  removeBtn: { backgroundColor: "#EF4444", padding: 8, borderRadius: 6 },
  removeBtnText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});

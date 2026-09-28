import { useCallback, useMemo } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ModuleHeader from "../../components/ModuleHeader";
import { CartItem, useCart } from "@/context/CartContext";
import { formatRupiah } from "@/utils/helpers";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from "@/constants/tokens";

export default function KeranjangScreen() {
  const { items, tambahItem, kurangItem, hapusItem } = useCart();

  // Group items by id and calculate quantities
  const groupedItems = useMemo(() => {
    const map = new Map<string, CartItem & { jumlah: number }>();
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

  const totalJumlah = useMemo(
    () => groupedItems.reduce((total, item) => total + item.jumlah, 0),
    [groupedItems]
  );

  const totalHarga = useMemo(
    () => items.reduce((total, item) => total + item.harga, 0),
    [items]
  );

  const handleAddItem = useCallback(
    (item: CartItem) => {
      tambahItem({ id: item.id, nama: item.nama, harga: item.harga });
    },
    [tambahItem]
  );

  const handleRemoveItem = useCallback(
    (id: string) => {
      kurangItem(id);
    },
    [kurangItem]
  );

  const handleDeleteItem = useCallback(
    (id: string) => {
      hapusItem(id);
    },
    [hapusItem]
  );

  const renderItem: ListRenderItem<CartItem & { jumlah: number }> = useCallback(
    ({ item }) => (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.nama}</Text>
          <Text style={styles.price}>{formatRupiah(item.harga)}</Text>
          
          <View style={styles.qtyRow}>
            <View style={styles.qtyControl}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => handleRemoveItem(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{item.jumlah}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => handleAddItem(item)}
                activeOpacity={0.7}
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
          onPress={() => handleDeleteItem(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.removeBtnText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    ),
    [handleAddItem, handleRemoveItem, handleDeleteItem]
  );

  const keyExtractor = useCallback((item: CartItem) => item.id, []);

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Keranjang Belanja"
        subtitle="Membaca dan menghapus data dari CartContext"
        category="03. State Management"
        color={COLORS.modules.state}
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
              <Text style={styles.totalValue}>{formatRupiah(totalHarga)}</Text>
            </View>

            <FlatList
              data={groupedItems}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: COLORS.background.light 
  },
  container: { 
    flex: 1, 
    padding: SPACING.lg,
  },
  listContent: {
    gap: SPACING.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.xs,
  },
  emptyText: { 
    color: COLORS.text.primary, 
    fontSize: FONT_SIZES.lg, 
    fontWeight: "bold" 
  },
  emptySubText: { 
    color: COLORS.text.tertiary, 
    fontSize: FONT_SIZES.md 
  },
  totalBox: {
    backgroundColor: COLORS.background.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  totalLabel: { 
    fontSize: FONT_SIZES.md, 
    color: COLORS.text.secondary 
  },
  totalValue: { 
    fontSize: FONT_SIZES.xl, 
    fontWeight: "bold", 
    color: COLORS.modules.state 
  },
  card: {
    backgroundColor: COLORS.background.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    flexDirection: "row",
    alignItems: "flex-start",
    ...SHADOWS.md,
  },
  cardContent: {
    flex: 1,
    marginRight: SPACING.md,
  },
  title: { 
    fontSize: FONT_SIZES.lg, 
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  price: { 
    fontSize: FONT_SIZES.md, 
    color: COLORS.modules.state, 
    fontWeight: "600", 
    marginTop: SPACING.xs,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#D1FAE5",
    borderRadius: BORDER_RADIUS.xl,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    gap: SPACING.xs,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.modules.state,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyBtnText: { 
    fontSize: FONT_SIZES.lg, 
    fontWeight: "bold", 
    color: COLORS.text.white, 
    lineHeight: 18 
  },
  qtyText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "bold",
    color: "#047857",
    minWidth: 24,
    textAlign: "center",
  },
  subtotalText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginTop: SPACING.sm,
  },
  removeBtn: { 
    backgroundColor: COLORS.error, 
    padding: SPACING.sm, 
    borderRadius: BORDER_RADIUS.md,
  },
  removeBtnText: { 
    color: COLORS.text.white, 
    fontSize: FONT_SIZES.sm, 
    fontWeight: "bold" 
  },
});

import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZES,
  SHADOWS,
  SPACING,
} from "@/constants/tokens";
import { CartItem, useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { formatRupiah } from "@/utils/helpers";
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

export default function KeranjangScreen() {
  const { items, tambahItem, kurangItem, hapusItem } = useCart();
  const { gelap } = useTheme();

  const totalJumlah = useMemo(
    () => items.reduce((total, item) => total + (item.quantity || 1), 0),
    [items],
  );

  const totalHarga = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.harga * (item.quantity || 1),
        0,
      ),
    [items],
  );

  const handleAddItem = useCallback(
    (item: CartItem) => {
      tambahItem({ id: item.id, nama: item.nama, harga: item.harga });
    },
    [tambahItem],
  );

  const handleRemoveItem = useCallback(
    (id: string) => {
      kurangItem(id);
    },
    [kurangItem],
  );

  const handleDeleteItem = useCallback(
    (id: string) => {
      hapusItem(id);
    },
    [hapusItem],
  );

  const renderItem: ListRenderItem<CartItem> = useCallback(
    ({ item }) => {
      const qty = item.quantity || 1;
      return (
        <View style={[styles.card, gelap && styles.cardDark]}>
          <View style={styles.cardContent}>
            <Text style={[styles.title, gelap && styles.titleDark]}>
              {item.nama}
            </Text>
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
                <Text style={styles.qtyText}>{qty}</Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => handleAddItem(item)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text
              style={[styles.subtotalText, gelap && styles.subtotalTextDark]}
            >
              Subtotal: {formatRupiah(item.harga * qty)}
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
      );
    },
    [handleAddItem, handleRemoveItem, handleDeleteItem, gelap],
  );

  const keyExtractor = useCallback((item: CartItem) => item.id, []);

  return (
    <View style={[styles.screen, gelap && styles.screenDark]}>
      <ModuleHeader
        title="Keranjang Belanja"
        subtitle="Membaca dan menghapus data dari CartContext"
        category="05. State Management Lanjut"
        color={COLORS.modules.state_lanjut}
        gelap={gelap}
      />
      <View style={styles.container}>
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, gelap && styles.emptyTextDark]}>
              Keranjang masih kosong.
            </Text>
            <Text style={styles.emptySubText}>
              Tambahkan produk dari halaman Daftar Produk.
            </Text>
          </View>
        ) : (
          <>
            <View style={[styles.totalBox, gelap && styles.totalBoxDark]}>
              <Text style={[styles.totalLabel, gelap && styles.totalLabelDark]}>
                Total ({items.length} produk, {totalJumlah} item)
              </Text>
              <Text style={styles.totalValue}>{formatRupiah(totalHarga)}</Text>
            </View>

            <FlatList
              data={items}
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
    backgroundColor: COLORS.background.light,
  },
  screenDark: {
    backgroundColor: COLORS.background.dark,
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
    fontWeight: "bold",
  },
  emptyTextDark: {
    color: "#F1F5F9",
  },
  emptySubText: {
    color: COLORS.text.tertiary,
    fontSize: FONT_SIZES.md,
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
  totalBoxDark: {
    backgroundColor: "#1E293B",
  },
  totalLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
  },
  totalLabelDark: {
    color: "#94A3B8",
  },
  totalValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "bold",
    color: COLORS.modules.state,
  },
  card: {
    backgroundColor: COLORS.background.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    flexDirection: "row",
    alignItems: "flex-start",
    ...SHADOWS.md,
  },
  cardDark: {
    backgroundColor: "#1E293B",
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
  titleDark: {
    color: "#F1F5F9",
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
    lineHeight: 18,
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
  subtotalTextDark: {
    color: "#94A3B8",
  },
  removeBtn: {
    backgroundColor: COLORS.error,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  removeBtnText: {
    color: COLORS.text.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: "bold",
  },
});

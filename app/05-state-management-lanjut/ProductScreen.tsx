import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import type { CartProduct } from "@/redux/cartSlice";
import { tambahItem, hapusItem } from "@/redux/cartSlice";
import { formatRupiah } from "@/utils/helpers";
import ModuleHeader from "../../components/ModuleHeader";
import { useTheme } from "@/context/ThemeContext";
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  BORDER_RADIUS,
  SHADOWS,
} from "@/constants/tokens";

const daftarProduk: CartProduct[] = [
  { id: "1", nama: "Buku React Native", harga: 85000 },
  { id: "2", nama: "Buku JavaScript", harga: 75000 },
  { id: "3", nama: "Buku TypeScript", harga: 95000 },
];

export default function ProductScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const { gelap } = useTheme();

  return (
    <View style={[styles.screen, gelap && styles.screenDark]}>
      <ModuleHeader
        title="Redux Cart"
        subtitle="Menambah & menghapus item keranjang via Redux store"
        category="05. State Management Lanjut"
        color="#8B5CF6"
        gelap={gelap}
      />
      <View style={styles.container}>
        <Text style={[styles.sectionTitle, gelap && styles.textDark]}>
          Daftar Produk
        </Text>
        <FlatList
          data={daftarProduk}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.card, gelap && styles.cardDark]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.title, gelap && styles.textDark]}>
                  {item.nama}
                </Text>
                <Text style={styles.price}>{formatRupiah(item.harga)}</Text>
              </View>
              <Pressable
                style={styles.addBtn}
                onPress={() => dispatch(tambahItem(item))}
              >
                <Text style={styles.addBtnText}>+ Keranjang</Text>
              </Pressable>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />

        <Text style={[styles.sectionTitle, gelap && styles.textDark]}>
          Keranjang ({items.length})
        </Text>
        {items.length === 0 ? (
          <Text style={[styles.emptyText, gelap && styles.emptyTextDark]}>
            Keranjang masih kosong
          </Text>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <View style={[styles.cartItem, gelap && styles.cardDark]}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, gelap && styles.textDark]}>
                    {item.nama}
                  </Text>
                  <Text style={styles.price}>{formatRupiah(item.harga)}</Text>
                </View>
                <Pressable
                  style={styles.removeBtn}
                  onPress={() => dispatch(hapusItem(item.id))}
                >
                  <Text style={styles.removeBtnText}>Hapus</Text>
                </Pressable>
              </View>
            )}
            contentContainerStyle={styles.listContent}
          />
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
    gap: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "700",
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  textDark: {
    color: "#F1F5F9",
  },
  card: {
    backgroundColor: COLORS.background.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    flexDirection: "row",
    alignItems: "center",
    ...SHADOWS.md,
  },
  cardDark: {
    backgroundColor: "#1E293B",
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  price: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.modules.state,
    fontWeight: "600",
    marginTop: SPACING.xs,
  },
  addBtn: {
    backgroundColor: COLORS.modules.state,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  addBtnText: {
    color: COLORS.text.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: "bold",
  },
  cartItem: {
    backgroundColor: COLORS.background.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    flexDirection: "row",
    alignItems: "center",
    ...SHADOWS.sm,
  },
  emptyText: {
    color: COLORS.text.secondary,
    fontSize: FONT_SIZES.md,
    textAlign: "center",
    paddingVertical: SPACING.xl,
  },
  emptyTextDark: {
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

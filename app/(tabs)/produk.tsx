import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZES,
  SHADOWS,
  SPACING,
} from "@/constants/tokens";
import { formatRupiah } from "@/utils/helpers";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

interface BukuProduk {
  id: string;
  title: string;
  author: string;
  harga: number;
}

const BUKU_PRODUK: BukuProduk[] = [
  { id: "1", title: "React Native for Beginners", author: "Expo Team", harga: 85000 },
  { id: "2", title: "Mastering TypeScript", author: "Jane Doe", harga: 95000 },
  { id: "3", title: "State Management Guide", author: "John Smith", harga: 75000 },
  { id: "4", title: "UI/UX Mobile Design", author: "Sarah Connor", harga: 65000 },
  { id: "5", title: "Panduan Node.js", author: "Tim DevC", harga: 80000 },
  { id: "6", title: "Desain Database", author: "Tim DevC", harga: 70000 },
];

export default function ProdukScreen() {
  const router = useRouter();
  const { totalItems, tambahItem } = useCart();
  const { gelap } = useTheme();

  const handleAdd = useCallback(
    (buku: BukuProduk) => {
      // Adapter Book -> CartItem (CartContext pakai field nama/harga)
      tambahItem({ id: buku.id, nama: buku.title, harga: buku.harga });
    },
    [tambahItem]
  );

  const renderItem: ListRenderItem<BukuProduk> = useCallback(
    ({ item }) => (
      <View style={[styles.card, gelap && styles.cardDark]}>
        <View style={styles.cardContent}>
          <Text style={[styles.title, gelap && styles.titleDark]}>
            {item.title}
          </Text>
          <Text style={[styles.author, gelap && styles.authorDark]}>
            oleh {item.author}
          </Text>
          <Text style={styles.price}>{formatRupiah(item.harga)}</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => handleAdd(item)}
          activeOpacity={0.7}
        >
          <Text style={styles.addBtnText}>+ Keranjang</Text>
        </TouchableOpacity>
      </View>
    ),
    [handleAdd, gelap]
  );

  return (
    <View style={[styles.screen, gelap && styles.screenDark]}>
      <ModuleHeader
        title="Produk Buku"
        subtitle="Katalog buku & keranjang belanja (CartContext)"
        category="Toko"
        color={COLORS.modules.state}
        gelap={gelap}
      />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() =>
            router.push("/03-state-management/keranjangScreen")
          }
          activeOpacity={0.8}
        >
          <Text style={styles.headerBtnText}>
            Lihat Keranjang ({totalItems}) →
          </Text>
        </TouchableOpacity>

        <FlatList
          data={BUKU_PRODUK}
          extraData={gelap}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
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
  headerBtn: {
    backgroundColor: COLORS.modules.state,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  headerBtnText: {
    color: COLORS.text.white,
    fontWeight: "bold",
    fontSize: FONT_SIZES.lg,
  },
  listContent: {
    gap: SPACING.md,
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
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "bold",
    color: COLORS.text.primary,
  },
  titleDark: {
    color: "#F1F5F9",
  },
  author: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  authorDark: {
    color: "#94A3B8",
  },
  price: {
    fontSize: FONT_SIZES.md,
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
});

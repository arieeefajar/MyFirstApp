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
import { useCart } from "@/context/CartContext";
import { PRODUCT_DATA } from "./data";
import { Product } from "@/types";
import { formatRupiah } from "@/utils/helpers";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from "@/constants/tokens";

export default function ProductScreen() {
  const router = useRouter();
  const { totalItems, tambahItem } = useCart();

  const handleAddToCart = useCallback((product: Product) => {
    tambahItem(product);
  }, [tambahItem]);

  const navigateToCart = useCallback(() => {
    router.push("/03-state-management/keranjangScreen");
  }, [router]);

  const renderProduct: ListRenderItem<Product> = useCallback(({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.nama}</Text>
        <Text style={styles.price}>{formatRupiah(item.harga)}</Text>
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => handleAddToCart(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.addBtnText}>+ Keranjang</Text>
      </TouchableOpacity>
    </View>
  ), [handleAddToCart]);

  const keyExtractor = useCallback((item: Product) => item.id, []);

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Daftar Produk"
        subtitle="Menambah produk ke keranjang global dengan CartContext"
        category="03. State Management"
        color={COLORS.modules.state}
      />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={navigateToCart}
          activeOpacity={0.8}
        >
          <Text style={styles.headerBtnText}>
            Lihat Keranjang ({totalItems}) →
          </Text>
        </TouchableOpacity>

        <FlatList
          data={PRODUCT_DATA}
          keyExtractor={keyExtractor}
          renderItem={renderProduct}
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
    backgroundColor: COLORS.background.light 
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
    fontSize: FONT_SIZES.lg 
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
  cardContent: {
    flex: 1,
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
  addBtn: {
    backgroundColor: COLORS.modules.state,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  addBtnText: { 
    color: COLORS.text.white, 
    fontSize: FONT_SIZES.sm, 
    fontWeight: "bold" 
  },
});

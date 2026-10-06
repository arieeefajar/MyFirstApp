import ModuleHeader from "../../components/ModuleHeader";
import { useNotification } from "@/context/NotificationContext";
import { useTheme } from "@/context/ThemeContext";
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZES,
  SHADOWS,
  SPACING,
} from "@/constants/tokens";
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function DaftarNotifikasiScreen() {
  const { notifikasi, jumlahNotifikasi, hapusSemua } = useNotification();
  const { gelap } = useTheme();

  const renderItem: ListRenderItem<string> = ({ item, index }) => (
    <View style={[styles.card, gelap && styles.cardDark]}>
      <View style={styles.nomor}>
        <Text style={styles.nomorText}>{index + 1}</Text>
      </View>
      <Text style={[styles.pesan, gelap && styles.pesanDark]}>{item}</Text>
    </View>
  );

  return (
    <View style={[styles.screen, gelap && styles.screenDark]}>
      <ModuleHeader
        title="Daftar Notifikasi"
        subtitle="Membaca notifikasi dari NotificationContext"
        category="03. State Management"
        color={COLORS.modules.state}
        gelap={gelap}
        rightAction={
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{jumlahNotifikasi}</Text>
          </View>
        }
      />
      <View style={styles.container}>
        {notifikasi.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, gelap && styles.emptyTextDark]}>
              Belum ada notifikasi.
            </Text>
            <Text style={styles.emptySubText}>
              Picu notifikasi baru dari layar Pemicu Notifikasi.
            </Text>
          </View>
        ) : (
          <>
            <Pressable style={styles.hapusBtn} onPress={hapusSemua}>
              <Text style={styles.hapusBtnText}>
                Hapus Semua ({jumlahNotifikasi})
              </Text>
            </Pressable>
            <FlatList
              data={notifikasi}
              extraData={gelap}
              keyExtractor={(_, index) => index.toString()}
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
  badge: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.error,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  badgeText: {
    color: COLORS.text.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: "800",
  },
  hapusBtn: {
    backgroundColor: COLORS.error,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  hapusBtnText: {
    color: COLORS.text.white,
    fontSize: FONT_SIZES.md,
    fontWeight: "700",
  },
  listContent: {
    gap: SPACING.sm,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    gap: SPACING.md,
    ...SHADOWS.sm,
  },
  cardDark: {
    backgroundColor: "#1E293B",
  },
  nomor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.modules.state,
    justifyContent: "center",
    alignItems: "center",
  },
  nomorText: {
    color: COLORS.text.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: "800",
  },
  pesan: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
  },
  pesanDark: {
    color: "#F1F5F9",
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
    textAlign: "center",
  },
});

import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { toggleSelesai, hapusTugas } from "@/redux/todoSlice";
import ModuleHeader from "../../components/ModuleHeader";
import { useTheme } from "@/context/ThemeContext";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from "@/constants/tokens";

export default function DaftarTugasScreen() {
  const items = useSelector((state: RootState) => state.todo.items);
  const dispatch = useDispatch<AppDispatch>();
  const { gelap } = useTheme();

  const selesaiCount = items.filter((t) => t.selesai).length;

  return (
    <View style={[styles.screen, gelap && styles.screenDark]}>
      <ModuleHeader
        title="Daftar Tugas"
        subtitle={`Total: ${items.length} | Selesai: ${selesaiCount}`}
        category="05. State Management Lanjut"
        color="#8B5CF6"
        gelap={gelap}
      />
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, gelap && styles.textDark]}>
            Belum ada tugas. Tambahkan dulu!
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.card, gelap && styles.cardDark]}
              onPress={() => dispatch(toggleSelesai(item.id))}
            >
              <View style={styles.checkbox}>
                <View
                  style={[
                    styles.checkboxOuter,
                    item.selesai && styles.checkboxChecked,
                  ]}
                >
                  {item.selesai && <View style={styles.checkboxInner} />}
                </View>
              </View>
              <View style={styles.content}>
                <Text
                  style={[
                    styles.judul,
                    item.selesai && styles.judulSelesai,
                    gelap && styles.textDark,
                  ]}
                >
                  {item.judul}
                </Text>
                <Text style={styles.status}>
                  {item.selesai ? "Selesai" : "Belum selesai"}
                </Text>
              </View>
              <Pressable
                style={styles.hapusBtn}
                onPress={() => dispatch(hapusTugas(item.id))}
              >
                <Text style={styles.hapusText}>Hapus</Text>
              </Pressable>
            </Pressable>
          )}
        />
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    textAlign: "center",
  },
  textDark: {
    color: "#94A3B8",
  },
  listContent: {
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
  },
  cardDark: {
    backgroundColor: "#1E293B",
  },
  checkbox: {
    marginRight: SPACING.md,
  },
  checkboxOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.text.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: COLORS.modules.state,
    borderColor: COLORS.modules.state,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.text.white,
  },
  content: {
    flex: 1,
  },
  judul: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    color: COLORS.text.primary,
  },
  judulSelesai: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  status: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  hapusBtn: {
    backgroundColor: COLORS.error,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
  },
  hapusText: {
    color: COLORS.text.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
  },
});

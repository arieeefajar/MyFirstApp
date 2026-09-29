import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LessonItem {
  title: string;
  desc: string;
  path: string;
  icon: keyof typeof Ionicons.glyphMap;
  type?: "materi" | "challenge";
}

interface LessonCategory {
  id: string;
  category: string;
  shortName: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bgColor: string;
  items: LessonItem[];
}

const LESSONS: LessonCategory[] = [
  {
    id: "01",
    category: "01. Basic Components",
    shortName: "Basic",
    icon: "cube-outline",
    color: "#6366F1",
    bgColor: "#EEF2FF",
    items: [
      {
        title: "View & Text Layout",
        desc: "Struktur layout dasar & penataan komponen teks",
        path: "/01-basic-components/view-text",
        icon: "layers-outline",
        type: "materi",
      },
      {
        title: "ScrollView & FlatList",
        desc: "Rendering daftar scrollable yang efisien",
        path: "/01-basic-components/scroll-view",
        icon: "list-outline",
        type: "materi",
      },
    ],
  },
  {
    id: "02",
    category: "02. Input Handling",
    shortName: "Input",
    icon: "create-outline",
    color: "#0EA5E9",
    bgColor: "#E0F2FE",
    items: [
      {
        title: "Input Dasar",
        desc: "TextInput dasar dan event onChangeText",
        path: "/02-input-handling/inputDasarScreen",
        icon: "text-outline",
        type: "materi",
      },
      {
        title: "Form Sederhana",
        desc: "Menangani input formulir dasar",
        path: "/02-input-handling/formSederhanaScreen",
        icon: "reader-outline",
        type: "materi",
      },
      {
        title: "Validasi Input",
        desc: "Validasi form & pesan error interaktif",
        path: "/02-input-handling/validasiInputScreen",
        icon: "shield-checkmark-outline",
        type: "materi",
      },
      {
        title: "Tombol Dismiss",
        desc: "Menutup keyboard saat layar disentuh",
        path: "/02-input-handling/tombolDismisScreen",
        icon: "keypad-outline",
        type: "materi",
      },
      {
        title: "Form Lengkap",
        desc: "Form komprehensif dengan validasi menyeluruh",
        path: "/02-input-handling/formLengkapScreen",
        icon: "clipboard-outline",
        type: "materi",
      },
      {
        title: "Challenge: Form Tambah Tugas",
        desc: "Tantangan membuat form tugas & validasi",
        path: "/02-input-handling/daftarLaguScreen",
        icon: "trophy-outline",
        type: "challenge",
      },
      {
        title: "Picker Dinamis",
        desc: "Dropdown seleksi data dinamis",
        path: "/02-input-handling/pickerDinamisScreen",
        icon: "options-outline",
        type: "materi",
      },
      {
        title: "Filter",
        desc: "Penyaringan data list secara instan",
        path: "/02-input-handling/filterScreen",
        icon: "funnel-outline",
        type: "materi",
      },
      {
        title: "Dropdown Custom",
        desc: "Komponen dropdown menu kustom interaktif",
        path: "/02-input-handling/dropdownCustomScreen",
        icon: "caret-down-circle-outline",
        type: "materi",
      },
      {
        title: "Tambah Buku",
        desc: "Studi kasus formulir penambahan buku",
        path: "/02-input-handling/tambahBukuScreen",
        icon: "add-circle-outline",
        type: "materi",
      },
    ],
  },
  {
    id: "03",
    category: "03. State Management",
    shortName: "State",
    icon: "sync-outline",
    color: "#10B981",
    bgColor: "#D1FAE5",
    items: [
      {
        title: "Counter Demo",
        desc: "Manajemen state dasar dengan useState",
        path: "/03-state-management/counterScreen",
        icon: "calculator-outline",
        type: "materi",
      },
      {
        title: "Lifting State",
        desc: "Membagi state antar komponen child",
        path: "/03-state-management/liftingStateScreen",
        icon: "trending-up-outline",
        type: "materi",
      },
      {
        title: "Effect Dasar",
        desc: "Lifecycle komponen dasar dengan useEffect",
        path: "/03-state-management/effectDasarScreen",
        icon: "flash-outline",
        type: "materi",
      },
      {
        title: "Effect Sekali",
        desc: "Menjalankan effect hanya saat mount",
        path: "/03-state-management/effectSekaliScreen",
        icon: "play-circle-outline",
        type: "materi",
      },
      {
        title: "Effect Dependensi",
        desc: "Menjalankan effect sesuai perubahan state",
        path: "/03-state-management/effectDependensiScreen",
        icon: "git-commit-outline",
        type: "materi",
      },
      {
        title: "Fetch Data",
        desc: "Pengambilan data asinkron dari REST API",
        path: "/03-state-management/fetchDataScreen",
        icon: "cloud-download-outline",
        type: "materi",
      },
      {
        title: "Timer",
        desc: "Interval timer & cleanup pada unmount",
        path: "/03-state-management/timerScreen",
        icon: "timer-outline",
        type: "materi",
      },
      {
        title: "Product List",
        desc: "List produk & keranjang belanjaan",
        path: "/03-state-management/productScreen",
        icon: "pricetags-outline",
        type: "materi",
      },
      {
        title: "Keranjang Belanjaan",
        desc: "Manajemen keranjang belanjaan dengan CartContext",
        path: "/03-state-management/keranjangScreen",
        icon: "cart-outline",
        type: "materi",
      },
      {
        title: "Challenge: Book Favorite",
        desc: "Context global untuk menyimpan daftar favorit",
        path: "/03-state-management/bookListScreen",
        icon: "heart-outline",
        type: "challenge",
      },
      {
        title: "Challenge: Auto-Save Draft",
        desc: "Simpan otomatis isi formulir ke state",
        path: "/03-state-management/autoSaveDraftScreen",
        icon: "save-outline",
        type: "challenge",
      },
    ],
  },
  {
    id: "04",
    category: "04. Navigation & Routing",
    shortName: "Navigasi",
    icon: "map-outline",
    color: "#F59E0B",
    bgColor: "#FEF3C7",
    items: [
      {
        title: "Daftar Buku",
        desc: "Navigasi antar halaman katalog buku",
        path: "/04-navigation-routing/DaftarBukuScreen",
        icon: "book-outline",
        type: "materi",
      },
      {
        title: "Detail Buku",
        desc: "Passing parameter dan membaca detail rute",
        path: "/04-navigation-routing/DetailBukuScreen",
        icon: "information-circle-outline",
        type: "materi",
      },
      {
        title: "Daftar Mahasiswa",
        desc: "Navigasi antar halaman daftar mahasiswa",
        path: "/04-navigation-routing/DaftarMahasiswaScreen",
        icon: "people-outline",
        type: "challenge",
      },
      {
        title: "Detail Mahasiswa",
        desc: "Passing parameter dan membaca detail rute",
        path: "/04-navigation-routing/DetailMahasiswaScreen",
        icon: "person-outline",
        type: "challenge",
      },
    ],
  },
];

export default function HomeMenu() {
  const router = useRouter();
  const { gelap, toggleTema } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Calculate statistics
  const totalCategories = LESSONS.length;
  const totalItems = LESSONS.reduce((acc, cat) => acc + cat.items.length, 0);
  const totalChallenges = LESSONS.reduce(
    (acc, cat) =>
      acc + cat.items.filter((item) => item.type === "challenge").length,
    0,
  );

  // Filtered lessons based on category & search query
  const filteredSections = useMemo(() => {
    return LESSONS.map((section) => {
      // If a specific category tab is selected, check if this section matches
      if (selectedFilter !== "all" && section.id !== selectedFilter) {
        return { ...section, items: [] };
      }

      // Filter items by search query
      const matchingItems = section.items.filter((item) => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;
        return (
          item.title.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query) ||
          section.category.toLowerCase().includes(query)
        );
      });

      return {
        ...section,
        items: matchingItems,
      };
    }).filter((section) => section.items.length > 0);
  }, [searchQuery, selectedFilter]);

  return (
    <SafeAreaView
      style={[styles.safeArea, gelap && styles.safeAreaDark]}
      edges={["top", "left", "right"]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      {/* Hero Header */}
      <View style={[styles.header, gelap && styles.headerDark]}>
        <View style={styles.headerTop}>
          <View style={{ flex: 1 }}>
            <View style={styles.badgeWrapper}>
              <Ionicons name="sparkles" size={13} color="#FBBF24" />
              <Text style={styles.badgeText}>React Native Learning</Text>
            </View>
            <Text style={styles.title}>Modul Pembelajaran</Text>
            <Text style={styles.subtitle}>
              Jelajahi materi, latihan praktis, dan tantangan kode.
            </Text>
          </View>
          <TouchableOpacity
            onPress={toggleTema}
            style={styles.themeToggle}
            activeOpacity={0.8}
          >
            <Ionicons
              name={gelap ? "sunny" : "moon"}
              size={20}
              color={gelap ? "#FBBF24" : "#FFFFFF"}
            />
          </TouchableOpacity>
        </View>

        {/* Quick Stats Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalCategories}</Text>
            <Text style={styles.statLabel}>Modul</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalItems}</Text>
            <Text style={styles.statLabel}>Materi</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalChallenges}</Text>
            <Text style={styles.statLabel}>Tantangan</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View
          style={[styles.searchContainer, gelap && styles.searchContainerDark]}
        >
          <Ionicons
            name="search-outline"
            size={19}
            color="#94A3B8"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Cari materi atau tantangan..."
            placeholderTextColor={gelap ? "#64748B" : "#94A3B8"}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, gelap && styles.searchInputDark]}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Pills Filter */}
      <View style={[styles.filterSection, gelap && styles.filterSectionDark]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          <TouchableOpacity
            style={[
              styles.filterChip,
              gelap && styles.filterChipDark,
              selectedFilter === "all" && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter("all")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterChipText,
                gelap && styles.filterChipTextDark,
                selectedFilter === "all" && styles.filterChipTextActive,
              ]}
            >
              Semua ({totalItems})
            </Text>
          </TouchableOpacity>

          {LESSONS.map((cat) => {
            const isActive = selectedFilter === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.filterChip,
                  gelap && !isActive && styles.filterChipDark,
                  isActive && {
                    backgroundColor: cat.color,
                    borderColor: cat.color,
                  },
                ]}
                onPress={() => setSelectedFilter(cat.id)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={cat.icon}
                  size={14}
                  color={isActive ? "#FFFFFF" : "#64748B"}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.filterChipText,
                    gelap && !isActive && styles.filterChipTextDark,
                    isActive && styles.filterChipTextActive,
                  ]}
                >
                  {cat.shortName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Main Content List */}
      <ScrollView
        style={[styles.contentList, gelap && styles.contentListDark]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredSections.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={[styles.emptyIconBg, gelap && styles.emptyIconBgDark]}>
              <Ionicons name="search-outline" size={32} color="#94A3B8" />
            </View>
            <Text style={[styles.emptyTitle, gelap && styles.emptyTitleDark]}>
              Materi Tidak Ditemukan
            </Text>
            <Text style={[styles.emptyText, gelap && styles.emptyTextDark]}>
              Tidak ada modul yang cocok dengan kata kunci &quot;{searchQuery}
              &quot;.
            </Text>
            <TouchableOpacity
              style={styles.emptyResetBtn}
              onPress={() => {
                setSearchQuery("");
                setSelectedFilter("all");
              }}
            >
              <Text style={styles.emptyResetText}>Reset Pencarian</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredSections.map((section) => (
            <View key={section.id} style={styles.sectionWrapper}>
              {/* Section Header */}
              <View style={styles.sectionHeader}>
                <View
                  style={[
                    styles.sectionIconBadge,
                    { backgroundColor: section.bgColor },
                  ]}
                >
                  <Ionicons
                    name={section.icon}
                    size={18}
                    color={section.color}
                  />
                </View>
                <View style={styles.sectionHeaderTextWrap}>
                  <Text
                    style={[
                      styles.sectionCategoryTitle,
                      gelap && styles.sectionCategoryTitleDark,
                    ]}
                  >
                    {section.category}
                  </Text>
                  <Text
                    style={[
                      styles.sectionItemCount,
                      gelap && styles.sectionItemCountDark,
                    ]}
                  >
                    {section.items.length} Pembelajaran
                  </Text>
                </View>
              </View>

              {/* Items Card List */}
              <View style={[styles.cardGroup, gelap && styles.cardGroupDark]}>
                {section.items.map((item, itemIdx) => {
                  const isChallenge = item.type === "challenge";
                  return (
                    <TouchableOpacity
                      key={itemIdx}
                      style={[
                        styles.card,
                        gelap && styles.cardDark,
                        isChallenge && styles.challengeCard,
                        itemIdx === section.items.length - 1 &&
                          styles.lastCardInGroup,
                      ]}
                      activeOpacity={0.7}
                      onPress={() => router.push(item.path as any)}
                    >
                      <View
                        style={[
                          styles.cardIconWrap,
                          {
                            backgroundColor: isChallenge
                              ? "#FEF3C7"
                              : section.bgColor,
                          },
                        ]}
                      >
                        <Ionicons
                          name={item.icon}
                          size={20}
                          color={isChallenge ? "#D97706" : section.color}
                        />
                      </View>

                      <View style={styles.cardContent}>
                        <View style={styles.cardTitleRow}>
                          <Text
                            style={[
                              styles.cardTitle,
                              gelap && styles.cardTitleDark,
                              isChallenge && styles.challengeTitle,
                            ]}
                          >
                            {item.title}
                          </Text>
                          {isChallenge && (
                            <View style={styles.challengeBadge}>
                              <Ionicons
                                name="flash"
                                size={10}
                                color="#D97706"
                                style={{ marginRight: 2 }}
                              />
                              <Text style={styles.challengeBadgeText}>
                                Challenge
                              </Text>
                            </View>
                          )}
                        </View>
                        <Text
                          style={[
                            styles.cardDesc,
                            gelap && styles.cardDescDark,
                          ]}
                          numberOfLines={2}
                        >
                          {item.desc}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.arrowWrap,
                          gelap && styles.arrowWrapDark,
                        ]}
                      >
                        <Ionicons
                          name="chevron-forward"
                          size={18}
                          color={isChallenge ? "#D97706" : "#94A3B8"}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))
        )}

        {/* Footer Note */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Pelajari modul secara bertahap untuk pemahaman optimal
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#4338CA",
  },
  header: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  themeToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  badgeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#E0E7FF",
    marginLeft: 5,
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: "#C7D2FE",
    marginTop: 4,
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  statLabel: {
    fontSize: 11,
    color: "#E0E7FF",
    marginTop: 2,
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1E293B",
    paddingVertical: 0,
  },
  filterSection: {
    backgroundColor: "#F8FAFC",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  filterChipActive: {
    backgroundColor: "#4338CA",
    borderColor: "#4338CA",
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },
  contentList: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  sectionWrapper: {
    marginBottom: 22,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sectionIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  sectionHeaderTextWrap: {
    flex: 1,
  },
  sectionCategoryTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    letterSpacing: -0.2,
  },
  sectionItemCount: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  cardGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  lastCardInGroup: {
    borderBottomWidth: 0,
  },
  challengeCard: {
    backgroundColor: "#FFFBEB",
  },
  cardIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    marginRight: 8,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 3,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },
  challengeTitle: {
    color: "#92400E",
  },
  challengeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  challengeBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#B45309",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  cardDesc: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 16,
  },
  arrowWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 16,
  },
  emptyResetBtn: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  emptyResetText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  footer: {
    marginTop: 16,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
  },
  safeAreaDark: {
    backgroundColor: "#1E1B4B",
  },
  headerDark: {
    backgroundColor: "#1E1B4B",
  },
  searchContainerDark: {
    backgroundColor: "#1E293B",
  },
  searchInputDark: {
    color: "#F1F5F9",
  },
  filterSectionDark: {
    backgroundColor: "#0F172A",
    borderBottomColor: "#1E293B",
  },
  filterChipDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  filterChipTextDark: {
    color: "#94A3B8",
  },
  contentListDark: {
    backgroundColor: "#0F172A",
  },
  sectionCategoryTitleDark: {
    color: "#F1F5F9",
  },
  sectionItemCountDark: {
    color: "#94A3B8",
  },
  cardGroupDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  cardDark: {
    borderBottomColor: "#334155",
  },
  cardTitleDark: {
    color: "#F1F5F9",
  },
  cardDescDark: {
    color: "#94A3B8",
  },
  arrowWrapDark: {
    backgroundColor: "#334155",
  },
  emptyIconBgDark: {
    backgroundColor: "#1E293B",
  },
  emptyTitleDark: {
    color: "#F1F5F9",
  },
  emptyTextDark: {
    color: "#94A3B8",
  },
});

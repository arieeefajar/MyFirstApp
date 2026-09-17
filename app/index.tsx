import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LESSONS = [
  {
    category: "01. Bassic Components",
    items: [
      {
        title: "View & Text Layout",
        path: "/01-basic-components/view-text",
      },
      {
        title: "ScrollView & FlatList",
        path: "/01-basic-components/scroll-view",
      },
    ],
  },
  {
    category: "02. Input Handling",
    items: [
      { title: "Input Dasar", path: "/02-input-handling/inputDasarScreen" },
      {
        title: "Form Sederhana",
        path: "/02-input-handling/formSederhanaScreen",
      },
      {
        title: "Validasi Input",
        path: "/02-input-handling/validasiInputScreen",
      },
      { title: "Tombol Dismis", path: "/02-input-handling/tombolDismisScreen" },
      { title: "Form Lengkap", path: "/02-input-handling/formLengkapScreen" },
      {
        title: "Challenge: Form Tambah Tugas",
        path: "/02-input-handling/daftarLaguScreen",
      },
      {
        title: "Picker Dinamis",
        path: "/02-input-handling/pickerDinamisScreen",
      },
      {
        title: "Filter",
        path: "/02-input-handling/filterScreen",
      },
      {
        title: "Dropdown Custom",
        path: "/02-input-handling/dropdownCustomScreen",
      },
      {
        title: "Tambah Buku",
        path: "/02-input-handling/tambahBukuScreen",
      },
    ],
  },
  {
    category: "03. State Management",
    items: [
      {
        title: "Conter Demo",
        path: "/03-state-management/counterScreen",
      },
      {
        title: "Lifting State",
        path: "/03-state-management/liftingStateScreen",
      },
      {
        title: "Effect Dasar",
        path: "/03-state-management/effectDasarScreen",
      },
      {
        title: "Effect Sekali",
        path: "/03-state-management/effectSekaliScreen",
      },
      {
        title: "Effect Dependensi",
        path: "/03-state-management/effectDependensiScreen",
      },
      {
        title: "Fetch Data",
        path: "/03-state-management/fetchDataScreen",
      },
      {
        title: "Timer",
        path: "/03-state-management/timerScreen",
      },
      {
        title: "Challenge: Book Favorite",
        path: "/03-state-management/bookListScreen",
      },
      {
        title: "Challenge: Auto-Save draft",
        path: "/03-state-management/autoSaveDraftScreen",
      },
    ],
  },
];

export default function HomeMenu() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Daftar Modul Belajar</Text>

      {LESSONS.map((section, idx) => (
        <View key={idx} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.category}</Text>

          {section.items.map((item, itemIdx) => (
            <TouchableOpacity
              key={itemIdx}
              style={styles.card}
              onPress={() => router.push(item.path as any)}
            >
              <Text style={styles.cardText}>{item.title}</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F3F4F6",
  },
  content: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1F2937",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  arrow: {
    fontSize: 18,
    color: "#4F46E5",
    fontWeight: "bold",
  },
});

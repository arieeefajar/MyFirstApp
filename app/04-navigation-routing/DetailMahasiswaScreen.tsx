import ModuleHeader from "@/components/ModuleHeader";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function DetailMahasiswaScreen() {
  const { nama, nim } = useLocalSearchParams<{ nama?: string; nim?: string }>();

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Detail Mahasiswa"
        subtitle="Menerima dan membaca paramter dari halaman sebelumnya"
        category="04. Navigation & Routing"
        color="#F59E0B"
      />

      <View style={styles.container}>
        <View style={styles.profileCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>
              {nama ? nama.charAt(0).toUpperCase() : "?"}
            </Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoCard}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>👤</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.label}>Nama Mahasiswa</Text>
              <Text style={styles.value}>{nama ?? "Tidak ada nama mahasiswa"}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🎓</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.label}>Nomor Induk Mahasiswa</Text>
              <Text style={styles.value}>{nim ?? "Tidak ada nim"}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: "#EEF2FF" 
  },
  container: { 
    flex: 1, 
    padding: 20 
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    alignItems: "center",
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "#EEF2FF",
  },
  avatarLargeText: {
    fontSize: 48,
    fontWeight: "700",
    color: "#fff",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#E0E7FF",
    marginVertical: 20,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: "#F5F3FF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  infoContent: {
    flex: 1,
  },
  label: { 
    fontSize: 12, 
    color: "#6366F1", 
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: "#1E1B4B",
  },
});

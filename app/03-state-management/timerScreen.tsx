import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

export default function TimerScreen() {
  const [detik, setDetik] = useState(0);
  const [berjalan, setBerjalan] = useState(true);

  useEffect(() => {
    if (!berjalan) return;

    const interval = setInterval(() => {
      setDetik((prev) => prev + 1);
    }, 1000);

    // CLEANUP – wajib, dijalankan sebelum efek berikutnya / saat unmount
    return () => clearInterval(interval);
  }, [berjalan]);

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Timer & Cleanup"
        subtitle="Interval timer dengan fungsi pembersih saat effect di-unmount"
        category="03. State Management"
        color="#10B981"
      />
      <View style={styles.container}>
        <Text style={styles.angka}>{detik} detik</Text>
        <Pressable
          style={styles.tombol}
          onPress={() => setBerjalan((prev) => !prev)}
        >
          <Text style={styles.teksTombol}>{berjalan ? "Jeda" : "Lanjutkan"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingBottom: 60,
  },
  angka: { fontSize: 40, fontWeight: "bold", color: "#0F172A" },
  tombol: {
    backgroundColor: "#10B981",
    paddingVertical: 12,
    borderRadius: 8,
    paddingHorizontal: 28,
  },
  teksTombol: { color: "#fff", fontWeight: "600", fontSize: 16 },
});

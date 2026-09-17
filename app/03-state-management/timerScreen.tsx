import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
    <View style={styles.container}>
      <Text style={styles.angka}>{detik} detik</Text>
      <Pressable
        style={styles.tombol}
        onPress={() => setBerjalan((prev) => !prev)}
      >
        <Text style={styles.teksTombol}>{berjalan ? "Jeda" : "Lanjutkan"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  angka: { fontSize: 32, fontWeight: "bold" },
  tombol: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    paddingHorizontal: 24,
  },
  teksTombol: { color: "#fff", fontWeight: "600" },
});

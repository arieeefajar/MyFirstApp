import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const opsiUrutkan = ["Terbaru", "Terlama", "A-Z", "Z-A"];

export default function DropdownCustomScreen() {
  const [terpilih, setTerpilih] = useState("Terbaru");
  const [tampilDropdown, setTampilDropdown] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable style={styles.trigger} onPress={() => setTampilDropdown(true)}>
        <Text>{terpilih}</Text>
        <Text style={styles.panah}>▼</Text>
      </Pressable>

      <Modal
        visible={tampilDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setTampilDropdown(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setTampilDropdown(false)}
        >
          <View style={styles.menuBox}>
            <FlatList
              data={opsiUrutkan}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.opsi}
                  onPress={() => {
                    setTerpilih(item);
                    setTampilDropdown(false);
                  }}
                >
                  <Text
                    style={
                      item === terpilih ? styles.opsiAktif : styles.opsiTeks
                    }
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  trigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },
  panah: { color: "#666" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 40,
  },
  menuBox: { backgroundColor: "#fff", borderRadius: 8, paddingVertical: 8 },
  opsi: { paddingVertical: 12, paddingHorizontal: 16 },
  opsiTeks: { color: "#333" },
  opsiAktif: { color: "#2196F3", fontWeight: "600" },
});

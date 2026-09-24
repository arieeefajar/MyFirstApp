import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

interface UserItem {
  id: number;
  name: string;
  email: string;
}

export default function FetchDataScreen() {
  const [data, setData] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Gagal memuat data:", err);
        setLoading(false);
      });
  }, []); // hanya fetch sekali saat layar dibuka

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Fetch Data API"
        subtitle="Pengambilan data asinkron dari REST API dengan useEffect"
        category="03. State Management"
        color="#10B981"
      />
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#10B981" />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.nama}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { padding: 16 },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  nama: { fontSize: 15, fontWeight: "600", color: "#1E293B" },
  email: { fontSize: 13, color: "#64748B", marginTop: 2 },
});

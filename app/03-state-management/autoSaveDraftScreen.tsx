import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ModuleHeader from "../../components/ModuleHeader";

export default function AutoSaveDraftScreen() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Draft tersimpan");

  useEffect(() => {
    if (!text.trim()) {
      setStatus("Menunggu ketikan...");
      return;
    }

    setStatus("Mengetik...");

    const timer = setTimeout(() => {
      console.log("Draft berhasil disimpan:", text);
      setStatus(`Tersimpan otomatis pada ${new Date().toLocaleTimeString()}`);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <View style={styles.screen}>
      <ModuleHeader
        title="Challenge: Auto-Save Draft"
        subtitle="Simpan otomatis dengan debounce 1,5 detik setelah berhenti mengetik"
        category="03. State Management"
        color="#10B981"
        isChallenge
      />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={6}
          placeholder="Tulis catatan di sini..."
          value={text}
          onChangeText={setText}
          textAlignVertical="top"
        />

        <View style={styles.statusBox}>
          <Text style={styles.statusText}>Status: {status}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: "#1F2937",
    minHeight: 150,
  },
  statusBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#E0E7FF",
    borderRadius: 6,
  },
  statusText: {
    fontSize: 14,
    color: "#3730A3",
    fontWeight: "600",
  },
});

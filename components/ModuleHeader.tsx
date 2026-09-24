import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface ModuleHeaderProps {
  title: string;
  subtitle?: string;
  category?: string;
  color?: string;
  isChallenge?: boolean;
  rightAction?: React.ReactNode;
}

export default function ModuleHeader({
  title,
  subtitle,
  category = "Modul Belajar",
  color = "#4F46E5",
  isChallenge = false,
  rightAction,
}: ModuleHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />

      <View
        style={[
          styles.container,
          { paddingTop: Math.max(insets.top, 12) + 6 },
        ]}
      >
        {/* Top Bar Row (Back Button & Category Pill) */}
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="chevron-back" size={20} color="#1E293B" />
          </TouchableOpacity>

          <View style={styles.topRightWrap}>
            {isChallenge && (
              <View style={styles.challengeBadge}>
                <Ionicons
                  name="trophy"
                  size={12}
                  color="#D97706"
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.challengeBadgeText}>CHALLENGE</Text>
              </View>
            )}

            <View
              style={[
                styles.categoryBadge,
                {
                  backgroundColor: color + "14",
                  borderColor: color + "33",
                },
              ]}
            >
              <View style={[styles.dot, { backgroundColor: color }]} />
              <Text
                style={[styles.categoryText, { color }]}
                numberOfLines={1}
              >
                {category}
              </Text>
            </View>

            {rightAction}
          </View>
        </View>

        {/* Title & Subtitle */}
        <View style={styles.titleWrap}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>

        {/* Bottom Accent Line */}
        <View style={styles.accentLineContainer}>
          <View style={[styles.accentDash, { backgroundColor: color }]} />
          <View style={styles.accentTrack} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
  },
  topRightWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  challengeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  challengeBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#B45309",
    letterSpacing: 0.4,
  },
  titleWrap: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 3,
    lineHeight: 18,
  },
  accentLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 3,
    borderRadius: 2,
    overflow: "hidden",
  },
  accentDash: {
    width: 48,
    height: 3,
    borderRadius: 2,
  },
  accentTrack: {
    flex: 1,
    height: 1,
    backgroundColor: "#F1F5F9",
  },
});

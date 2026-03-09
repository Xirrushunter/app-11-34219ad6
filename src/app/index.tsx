import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { appTheme, screens } from "../data/screens";
import { storeConfig } from "../config/store";

type Screen = (typeof screens)[number];

export default function HomeScreen() {
  const [activeScreenId, setActiveScreenId] = useState<string>(screens[0]?.id ?? "home");

  const activeScreen = useMemo<Screen>(() => {
    return screens.find((screen) => screen.id === activeScreenId) ?? screens[0];
  }, [activeScreenId]);

  return (
    <SafeAreaView style={[styles.safe, appTheme.theme === "dark" ? styles.dark : styles.light]}>
      <StatusBar barStyle={appTheme.theme === "dark" ? "light-content" : "dark-content"} />

      <View style={styles.header}>
        <Text style={[styles.appName, { color: appTheme.primaryColor }]}>{appTheme.appName}</Text>
        <Text style={styles.storeText}>{storeConfig.shopDomain || "Connect your Shopify store"}</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.screenTitle}>{activeScreen.title}</Text>
        <Text style={styles.screenDescription}>{activeScreen.description}</Text>

        <View style={styles.blockStack}>
          {activeScreen.blocks.map((block) => (
            <View key={block} style={styles.blockCard}>
              <Text style={styles.blockText}>{block}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        {screens.map((screen) => {
          const isActive = screen.id === activeScreenId;

          return (
            <TouchableOpacity
              key={screen.id}
              style={[styles.tabButton, isActive && { backgroundColor: appTheme.primaryColor }]}
              onPress={() => setActiveScreenId(screen.id)}
            >
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{screen.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  dark: { backgroundColor: "#0f172a" },
  light: { backgroundColor: "#f8fafc" },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1"
  },
  appName: { fontSize: 22, fontWeight: "700" },
  storeText: { marginTop: 4, color: "#475569", fontSize: 13 },
  content: { flex: 1 },
  contentContainer: { padding: 16, gap: 12 },
  screenTitle: { fontSize: 26, fontWeight: "700", color: "#0f172a" },
  screenDescription: { fontSize: 14, color: "#475569" },
  blockStack: { marginTop: 8, gap: 10 },
  blockCard: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: "#ffffff"
  },
  blockText: { fontSize: 14, color: "#0f172a", fontWeight: "500" },
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: "#cbd5e1",
    padding: 12,
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap"
  },
  tabButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#e2e8f0"
  },
  tabLabel: { color: "#1e293b", fontSize: 12, fontWeight: "600" },
  tabLabelActive: { color: "#ffffff" }
});

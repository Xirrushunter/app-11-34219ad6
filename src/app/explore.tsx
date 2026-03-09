import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.card}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.copy}>This screen is AI-managed and does not depend on local image assets.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc", padding: 16 },
  card: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 14,
    backgroundColor: "#ffffff",
    padding: 16,
    gap: 8
  },
  title: { fontSize: 24, fontWeight: "700", color: "#0f172a" },
  copy: { fontSize: 14, color: "#475569" }
});

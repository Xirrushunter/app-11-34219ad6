import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { ProductSummary } from "../../src/features/shopify/types";
import { useShopifyCatalog } from "../../src/features/shopify/use-shopify-catalog";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const { data } = useShopifyCatalog();

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return data;
    return data.filter((item) => item.title.toLowerCase().includes(normalized));
  }, [data, query]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.searchWrap}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search products"
          style={styles.input}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: ProductSummary }) => (
          <Link href={{ pathname: "/product/[handle]", params: { handle: item.handle } }} asChild>
            <View style={styles.row}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.price}>{"$"}{item.price}</Text>
            </View>
          </Link>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },
  searchWrap: { padding: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  row: { paddingHorizontal: 14, paddingVertical: 14, backgroundColor: "#ffffff" },
  name: { fontSize: 15, color: "#0f172a", fontWeight: "600" },
  price: { marginTop: 6, color: "#334155" },
  separator: { height: 1, backgroundColor: "#e2e8f0" }
});

import { Link } from "expo-router";
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ProductSummary } from "../../src/features/shopify/types";
import { useShopifyCatalog } from "../../src/features/shopify/use-shopify-catalog";

function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <Link href={{ pathname: "/product/[handle]", params: { handle: product.handle } }} asChild>
      <View style={styles.card}>
        {product.imageUrl ? <Image source={{ uri: product.imageUrl }} style={styles.image} /> : <View style={styles.imageFallback} />}
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{"$"}{product.price}</Text>
      </View>
    </Link>
  );
}

export default function HomeScreen() {
  const { data, loading, error, refresh } = useShopifyCatalog();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.heading}>Featured products</Text>
        <Text style={styles.subheading}>Live data from your Shopify store</Text>
      </View>

      {loading ? <ActivityIndicator style={styles.loader} /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.list}
        onRefresh={refresh}
        refreshing={loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },
  header: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  heading: { fontSize: 24, fontWeight: "700", color: "#0f172a" },
  subheading: { marginTop: 4, color: "#334155", fontSize: 13 },
  loader: { marginTop: 12 },
  error: { color: "#b91c1c", paddingHorizontal: 16, marginBottom: 8 },
  list: { padding: 12, gap: 12 },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    overflow: "hidden"
  },
  image: { width: "100%", height: 180, backgroundColor: "#e2e8f0" },
  imageFallback: { width: "100%", height: 180, backgroundColor: "#e2e8f0" },
  title: { fontSize: 16, fontWeight: "600", color: "#0f172a", paddingHorizontal: 12, paddingTop: 10 },
  price: { fontSize: 14, color: "#334155", paddingHorizontal: 12, paddingVertical: 10 }
});

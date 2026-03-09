import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useCart } from "../../src/features/cart/cart-context";
import { useShopify } from "../../src/features/shopify/shopify-provider";
import { ProductDetail } from "../../src/features/shopify/types";

export default function ProductScreen() {
  const { handle } = useLocalSearchParams<{ handle: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addLine } = useCart();
  const { fetchProductByHandle } = useShopify();

  useEffect(() => {
    let ignore = false;

    async function load() {
      if (!handle) return;
      setLoading(true);
      setError(null);

      try {
        const next = await fetchProductByHandle(handle);
        if (!ignore) {
          setProduct(next);
        }
      } catch (caught) {
        if (!ignore) {
          setError(caught instanceof Error ? caught.message : "Failed to load product");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      ignore = true;
    };
  }, [handle]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>{error ?? "Product not found"}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        {product.imageUrl ? <Image source={{ uri: product.imageUrl }} style={styles.image} /> : null}
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{"$"}{product.price}</Text>
        {product.description ? <Text style={styles.description}>{product.description}</Text> : null}

        <TouchableOpacity
          style={styles.cta}
          onPress={() => {
            addLine({
              variantId: product.variantId,
              title: product.title,
              price: product.price,
              quantity: 1
            });
          }}
        >
          <Text style={styles.ctaLabel}>Add to cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f8fafc" },
  error: { color: "#b91c1c" },
  content: { padding: 16, gap: 10 },
  image: { width: "100%", height: 260, borderRadius: 12, backgroundColor: "#e2e8f0" },
  title: { fontSize: 24, fontWeight: "700", color: "#0f172a" },
  price: { fontSize: 20, fontWeight: "700", color: "#0f766e" },
  description: { fontSize: 14, lineHeight: 20, color: "#334155" },
  cta: { marginTop: 12, backgroundColor: "#0f766e", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  ctaLabel: { color: "#ffffff", fontWeight: "700", fontSize: 16 }
});

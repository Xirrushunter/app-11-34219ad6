import { Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../../src/features/cart/cart-context";

export default function CartScreen() {
  const { lines, subtotal, checkoutUrl, removeLine, increment, decrement } = useCart();

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.heading}>Your cart</Text>

      {lines.length === 0 ? <Text style={styles.empty}>Your cart is empty.</Text> : null}

      {lines.map((line) => (
        <View key={line.variantId} style={styles.row}>
          <View style={styles.rowMain}>
            <Text style={styles.name}>{line.title}</Text>
            <Text style={styles.meta}>{"$"}{line.price} x {line.quantity}</Text>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity style={styles.smallBtn} onPress={() => decrement(line.variantId)}>
              <Text style={styles.smallBtnLabel}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallBtn} onPress={() => increment(line.variantId)}>
              <Text style={styles.smallBtnLabel}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.removeBtn} onPress={() => removeLine(line.variantId)}>
              <Text style={styles.removeBtnLabel}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.total}>Subtotal: {"$"}{subtotal.toFixed(2)}</Text>
        <TouchableOpacity
          style={[styles.checkoutBtn, !checkoutUrl && styles.checkoutBtnDisabled]}
          disabled={!checkoutUrl}
          onPress={() => {
            if (checkoutUrl) {
              void Linking.openURL(checkoutUrl);
            }
          }}
        >
          <Text style={styles.checkoutBtnLabel}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc", padding: 12 },
  heading: { fontSize: 24, fontWeight: "700", color: "#0f172a", marginBottom: 12 },
  empty: { color: "#475569", marginTop: 8 },
  row: { backgroundColor: "#fff", borderRadius: 12, borderWidth: 1, borderColor: "#e2e8f0", padding: 12, marginBottom: 10 },
  rowMain: { marginBottom: 8 },
  name: { fontSize: 15, fontWeight: "600", color: "#0f172a" },
  meta: { marginTop: 4, color: "#475569" },
  controls: { flexDirection: "row", gap: 8 },
  smallBtn: { borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, width: 34, alignItems: "center", justifyContent: "center" },
  smallBtnLabel: { fontSize: 18, color: "#0f172a" },
  removeBtn: { borderWidth: 1, borderColor: "#fca5a5", borderRadius: 8, paddingHorizontal: 10, justifyContent: "center" },
  removeBtnLabel: { color: "#b91c1c", fontWeight: "600" },
  footer: { marginTop: "auto", paddingTop: 12 },
  total: { fontSize: 18, fontWeight: "700", color: "#0f172a", marginBottom: 10 },
  checkoutBtn: { backgroundColor: "#0f766e", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  checkoutBtnDisabled: { backgroundColor: "#94a3b8" },
  checkoutBtnLabel: { color: "#fff", fontWeight: "700", fontSize: 16 }
});

import { Stack } from "expo-router";
import { CartProvider } from "../src/features/cart/cart-context";
import { ShopifyProvider } from "../src/features/shopify/shopify-provider";

export default function RootLayout() {
  return (
    <ShopifyProvider>
      <CartProvider>
        <Stack screenOptions={{ headerBackTitle: "Back" }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="product/[handle]" options={{ title: "Product" }} />
        </Stack>
      </CartProvider>
    </ShopifyProvider>
  );
}

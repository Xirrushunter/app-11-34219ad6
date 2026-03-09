import { createContext, useContext, useMemo, useState } from "react";
import { useShopify } from "../shopify/shopify-provider";

interface CartLine {
  variantId: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  subtotal: number;
  checkoutUrl: string | null;
  addLine: (line: CartLine) => void;
  increment: (variantId: string) => void;
  decrement: (variantId: string) => void;
  removeLine: (variantId: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const { shopDomain } = useShopify();

  const value = useMemo<CartContextValue>(() => {
    const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
    const checkoutPath = lines
      .map((line) => line.variantId + ":" + line.quantity)
      .join(",");

    const checkoutUrl = checkoutPath ? "https://" + shopDomain + "/cart/" + checkoutPath : null;

    return {
      lines,
      subtotal,
      checkoutUrl,
      addLine: (line) => {
        setLines((current) => {
          const existing = current.find((item) => item.variantId === line.variantId);
          if (!existing) {
            return [...current, line];
          }

          return current.map((item) =>
            item.variantId === line.variantId
              ? { ...item, quantity: item.quantity + line.quantity }
              : item
          );
        });
      },
      increment: (variantId) => {
        setLines((current) =>
          current.map((item) =>
            item.variantId === variantId ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      },
      decrement: (variantId) => {
        setLines((current) =>
          current
            .map((item) =>
              item.variantId === variantId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
            )
            .filter((item) => item.quantity > 0)
        );
      },
      removeLine: (variantId) => {
        setLines((current) => current.filter((item) => item.variantId !== variantId));
      }
    };
  }, [lines, shopDomain]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

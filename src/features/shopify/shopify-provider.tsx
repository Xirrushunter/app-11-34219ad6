import { createContext, useCallback, useContext, useMemo } from "react";
import { fetchCatalog as fetchCatalogApi, fetchProductByHandle as fetchProductByHandleApi } from "./api";
import { storeConfig } from "./store-config";
import { ProductDetail, ProductSummary } from "./types";

interface ShopifyContextValue {
  shopDomain: string;
  brandColor: string;
  fetchCatalog: () => Promise<ProductSummary[]>;
  fetchProductByHandle: (handle: string) => Promise<ProductDetail>;
}

const ShopifyContext = createContext<ShopifyContextValue | null>(null);

export function ShopifyProvider({ children }: { children: React.ReactNode }) {
  const fetchCatalog = useCallback(async () => {
    return fetchCatalogApi();
  }, []);

  const fetchProductByHandle = useCallback(async (handle: string) => {
    return fetchProductByHandleApi(handle);
  }, []);

  const value = useMemo<ShopifyContextValue>(
    () => ({
      shopDomain: storeConfig.shopDomain,
      brandColor: storeConfig.brandColor,
      fetchCatalog,
      fetchProductByHandle
    }),
    [fetchCatalog, fetchProductByHandle]
  );

  return <ShopifyContext.Provider value={value}>{children}</ShopifyContext.Provider>;
}

export function useShopify(): ShopifyContextValue {
  const context = useContext(ShopifyContext);
  if (!context) {
    throw new Error("useShopify must be used inside ShopifyProvider");
  }

  return context;
}

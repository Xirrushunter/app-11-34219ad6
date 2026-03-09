import { useCallback, useEffect, useState } from "react";
import { useShopify } from "./shopify-provider";
import { ProductSummary } from "./types";

export function useShopifyCatalog() {
  const { fetchCatalog } = useShopify();
  const [data, setData] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const next = await fetchCatalog();
      setData(next);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to fetch catalog");
    } finally {
      setLoading(false);
    }
  }, [fetchCatalog]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

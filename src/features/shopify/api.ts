import { storeConfig } from "./store-config";
import { ProductDetail, ProductSummary } from "./types";

function apiUrl(path: string): string {
  const root = storeConfig.backendBaseUrl.replace(//$/, "");
  return root + path;
}

export async function fetchCatalog(): Promise<ProductSummary[]> {
  const response = await fetch(apiUrl("/api/projects/" + storeConfig.projectId + "/shopify/catalog"));
  const payload = (await response.json().catch(() => null)) as
    | { products?: ProductSummary[]; error?: string }
    | null;

  if (!response.ok || !payload?.products) {
    throw new Error(payload?.error ?? "Failed to fetch Shopify catalog");
  }

  return payload.products;
}

export async function fetchProductByHandle(handle: string): Promise<ProductDetail> {
  const response = await fetch(
    apiUrl("/api/projects/" + storeConfig.projectId + "/shopify/products/" + encodeURIComponent(handle))
  );
  const payload = (await response.json().catch(() => null)) as
    | { product?: ProductDetail; error?: string }
    | null;

  if (!response.ok || !payload?.product) {
    throw new Error(payload?.error ?? "Failed to fetch Shopify product");
  }

  return payload.product;
}

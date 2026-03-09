import { storeConfig } from "../config/store";

export async function fetchShopProducts() {
  const response = await fetch(
    `${storeConfig.backendBaseUrl}/api/projects/${storeConfig.projectId}`,
    {
      method: "GET"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch app configuration from backend");
  }

  return response.json();
}

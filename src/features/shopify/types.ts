export interface ProductSummary {
  id: string;
  title: string;
  handle: string;
  imageUrl?: string;
  price: number;
  variantId: string;
}

export interface ProductDetail extends ProductSummary {
  description?: string;
}

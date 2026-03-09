export const appTheme = {
  appName: "app-11",
  theme: "light",
  primaryColor: "#0f766e"
} as const;

export const screens = [
  {
    "id": "home",
    "title": "Home",
    "blocks": [
      "Hero",
      "Featured products",
      "Collections"
    ],
    "description": "Merchandising home screen with Shopify-powered sections."
  },
  {
    "id": "products",
    "title": "Products",
    "blocks": [
      "Search",
      "Filters",
      "Product grid"
    ],
    "description": "Browse products from Shopify with filters and sorting."
  },
  {
    "id": "cart",
    "title": "Cart",
    "blocks": [
      "Cart items",
      "Promo code",
      "Checkout CTA"
    ],
    "description": "Review selected products and move to checkout."
  }
] as const;

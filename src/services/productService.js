import { products } from "../../data/products.js";

const USE_MOCK_DATA = true;

const API_URL = import.meta.env.VITE_API_URL || "/api";

export async function getProducts() {
  if (USE_MOCK_DATA) {
   return products

    }
  

 const response = await fetch(`${API_URL}/products`, {
  headers: {
    "Accept": "application/json",
  },
})

if (!response.ok) {
  throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
}

  const result = await response.json();
  return result.data ?? result;
}
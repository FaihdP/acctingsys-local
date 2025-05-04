import { Product } from "@lib/db/schemas/product/Product";

export default function validateProduct(product: Product) {
  const { name, value, quantity, userId, user, isDeleted  } = product

  if (!name) throw new Error("Product name is required")
  if (!userId || !user) throw new Error("Invoice user is required")
  if (isDeleted === undefined) throw new Error("Product isDeleted is required")
  
  if (value) {
    if (value < 0) throw new Error("Product value must be greater than or equal to 0")
  }

  if (quantity) {
    if (quantity < 0) throw new Error("Product quantity must be greater than or equal to 0")
  }
}
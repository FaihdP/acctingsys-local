"use client"

import find, { FindResults, ToNumbers } from "@lib/db/repositories/find";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { ProductDocument } from "@lib/db/schemas/product/Product";

export default async function getProducts(
  filters: any,
  pageNumber?: number,
  fields?: Partial<ToNumbers<ProductDocument>>
): Promise<FindResults<ProductDocument[]>> {
  const result = await find<ProductDocument>(
    COLLECTIONS.PRODUCTS, 
    filters, 
    pageNumber ? { size: 25, number: pageNumber } : undefined,
    undefined,
    fields
  )

  return result
}
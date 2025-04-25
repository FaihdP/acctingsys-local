"use client"

import find, { FindResults } from "@lib/db/repositories/find";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import { ProductDocument } from "@lib/db/schemas/product/Product";

export default async function getProducts(
  filters: any
): Promise<FindResults<ProductDocument[]>> {
  //await new Promise(r => setTimeout(r, 10000))
  const result = await find<ProductDocument>(
    COLLECTIONS.PRODUCTS, 
    {
      ...filters,
      isDeleted: false,
    }, 
    undefined,
    undefined,
    { name: 1, value: 1 }
  )

  return result.data ? result : { data: [], pages_number: 0, total_records: 0 }
}
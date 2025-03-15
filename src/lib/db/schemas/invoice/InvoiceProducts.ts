import ProductValue from "@schemas/embedded/ProductValue"
import MongoDocument from "@schemas/common/MongoDocument"

export interface InvoiceProducts {
  invoiceId: string
  quantity?: number
  totalValue: number
  productId?: string
  product?: ProductValue
}

export interface InvoiceProductDocument extends InvoiceProducts, MongoDocument {}
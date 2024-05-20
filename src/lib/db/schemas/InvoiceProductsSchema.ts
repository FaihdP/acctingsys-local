interface Product {
  name: string
  value: number
}

export interface InvoiceProducts {
  invoiceId: string
  amount?: number
  value: number
  productId?: string
  product: Product
}
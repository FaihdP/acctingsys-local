import find, { FindResults } from "@lib/db/repositories/find";
import { InvoiceDocument, InvoiceType } from "@lib/db/schemas/invoice/Invoice";

function getInvoiceStatus(object: InvoiceDocument): string {
  if (object.isPaid) return "Pagada"
  if (
    !object.isPaid 
    && object.value 
    && object.value > 0
  ) return "En deuda"
  return "Generada"
}

export default async function getInvoices(
  filters: any, 
  pageNumber?: number
): Promise<FindResults<InvoiceDocument[]>> {
  const result = await find<InvoiceDocument>(
    "invoices", 
    { 
      type: InvoiceType.SALE, 
      isDeleted: false, 
      ...filters 
    }, 
    pageNumber ? { size: 25, number: pageNumber } : undefined
  )

  result.data.forEach(element => {
    element.status = getInvoiceStatus(element)
  });

  return result.data ? result : { data: [], pages_number: 0 }
}
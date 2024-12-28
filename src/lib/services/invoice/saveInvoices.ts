import { Invoice, InvoiceType } from "@lib/db/schemas/invoice/Invoice";
import handleError from "@lib/util/error/handleError";

export default async function saveInvoices(data: Invoice[]) {
  try {
    const dataProcessed = data.map((item) => {
      const itemProccesed: Partial<Invoice> = {}
      
      Object.entries(item).forEach(([key, value]) => {
        if (["isEditable", "isSelected", "isNewRow"].includes(key)) return
        if (!value) return
        itemProccesed[key as keyof Invoice] = value
      });

      itemProccesed.type = InvoiceType.SALE
      itemProccesed.isDeleted = false

      return itemProccesed
    })

    console.log(dataProcessed)
    
    //await save<Partial<Invoice>>(COLLECTIONS.INVOICES, dataProcessed)
  } catch (err) {
    handleError(err)
  }
}
import getInvoices from "@lib/services/invoice/getInvoices";
import handleError from "@lib/util/error/handleError";
import { Row } from "@ui/table/interfaces/Row";

export default async function validateInvoiceValue(row: Row): Promise<string | null> {
  try {
    const invoiceId = row.value.invoiceId
    const paymentValue = row.value.value
    if (!invoiceId) return "No se ha seleccionado una factura"
    console.log(row)
    const invoice = (await getInvoices({ _id: { $oid: invoiceId } })).data[0]
    if (!invoice) return "No se ha encontrado la factura a relacionar"
    if (invoice.value < paymentValue) return "El valor del pago no puede ser mayor que el de la factura"
    if (invoice.isPaid) return "La factura ya ha sido pagada"
  } catch (error) {
    handleError(error)
    return "No se ha encontrado la factura a relacionar"
  }
  return null
}

import getInvoices from "@lib/services/invoice/getInvoices";
import handleError from "@lib/util/error/handleError";
import { Row } from "@ui/table/interfaces/Row";
import getPayments from "../getPayments";

export default async function validateInvoiceValue(row: Row): Promise<string | null> {
  const invoiceId = row.value.invoiceId
  const paymentValue = row.value.value
  if (!invoiceId) return "No se ha seleccionado una factura"

  try {
    const invoice = (await getInvoices({ _id: { $oid: invoiceId } })).data[0]
    if (!invoice) return "No se ha encontrado la factura a relacionar"

    if (!row.value.isNewRow) {
      const payment = (await getPayments({ _id: { $oid: row.value._id.$oid } })).data[0]
      if (payment) if (paymentValue === payment.value) return null
    }

    if (invoice.value < paymentValue) return "El valor del pago no puede ser mayor que el de la factura"
    
    if (invoice.isPaid) return "La factura ya ha sido pagada"
  } catch (error) {
    handleError(error)
    if (!row.value.isNewRow) return "Hubo un problema modificando el pago de la factura"
    return "Hubo un problema relacionando el pago a la factura"

  }
  
  return null
}

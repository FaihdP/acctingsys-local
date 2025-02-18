import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus";
import COLORS from "@ui/core/util/colors";

const INVOICE_STATUS_COLORS = new Map([
  [INVOICE_STATUS.PAID, { background: COLORS.GREEN, fontColor: "#0D6948" }],
  [INVOICE_STATUS.DEBT, { background: "#FB8383", fontColor: "#922323" }],
  [INVOICE_STATUS.CREATED, { background: "#8490FF", fontColor: "#1A29AE" }],
])

export default INVOICE_STATUS_COLORS
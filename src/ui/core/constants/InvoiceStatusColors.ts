import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus";
import COLORS from "@ui/core/util/colors";

const INVOICE_STATUS_COLORS = {
  [INVOICE_STATUS.PAID]: { backgroundColor: COLORS.GREEN.substring(1), fontColor: "0D6948" },
  [INVOICE_STATUS.DEBT]: { backgroundColor: "FB8383", fontColor: "922323" },
  [INVOICE_STATUS.CREATED]: { backgroundColor: "8490FF", fontColor: "1A29AE" },
}

export default INVOICE_STATUS_COLORS
import getProducts from "@lib/services/product/getProducts"
import { ColumType, TableConfigHeaderProps } from "@ui/table/interfaces/Table"

const InvoiceProductsTableColumns: TableConfigHeaderProps["columns"] = [
  {
    label: "Producto",
    type: ColumType.OBJECT,
    tag: "product",
    fields: ["name"],
    relationship: getProducts,
    relatedFields: new Map([
      [
        "value", 
        (row) => { if (row.product) return row.product.value}
      ]
    ])
  },
  {
    label: "Valor unitario",
    type: ColumType.CURRENCY,
    tag: "value",
    relatedFields: new Map([
      ["totalValue", (row) => row.value * row.quantity]
    ])
  },
  {
    label: "Cantidad",
    type: ColumType.NUMBER,
    tag: "quantity",
    relatedFields: new Map([
      ["totalValue", (row) => row.value * row.quantity]
    ])
  },
  {
    label: "Valor total",
    type: ColumType.CURRENCY,
    tag: "totalValue",
    required: true
  },
]

export default InvoiceProductsTableColumns
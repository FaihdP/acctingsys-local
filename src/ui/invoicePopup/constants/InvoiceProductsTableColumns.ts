import getProductsList from "@lib/services/product/getProductsList"
import { ColumType, TableConfigHeaderProps } from "@ui/table/interfaces/Table"

const InvoiceProductsTableColumns: TableConfigHeaderProps["columns"] = [
  {
    label: "Producto",
    type: ColumType.OBJECT,
    tag: "product",
    fields: ["name"],
    relationship: getProductsList,
    relatedFields: new Map([
      [
        "value", 
        (row) => { 
          console.log(row)
          if (row.product) {
            return row.product.value
          }
        }
      ]
    ])
  },
  {
    label: "Valor unitario",
    type: ColumType.OBJECT,
    tag: "product",
    fields: ["value"],
    relationship: async () => [],
    relatedFields: new Map([
      ["totalValue", (row) => row.value * row.quantity]
    ])
  },
  {
    label: "Cantidad",
    type: ColumType.NUMBER,
    tag: "quantity",
    relatedFields: new Map([
      ["totalValue", (row) => {
        console.log(row)
        return row.product.value * row.quantity
      }]
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
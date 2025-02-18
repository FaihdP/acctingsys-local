import DynamicTable from "@ui/table/containers/DynamicTable";
import InvoiceProductsTableColumns from "../constants/InvoiceProductsTableColumns";
import { TableConfigProps } from "@ui/table/interfaces/Table";
import { useContext, useEffect, useRef, useState } from "react";
import { InvoicePopupContext } from "../hooks/InvoicePopupProvider";

export default function InvoiceProductsTable() {
  const {invoiceProducts, setInvoice} = useContext(InvoicePopupContext)

  const [pageSelected, setPageSelected] = useState<number>(1)
  const pagesNumber = useRef<number>(1)

  const invoiceProductTableConfig = useRef<TableConfigProps>({
    header: {
      picker: true,
      columns: InvoiceProductsTableColumns,
      options: {
        onEdit: true
      }
    },
  })

  useEffect(() => {
    invoiceProductTableConfig.current.actions = {
      onAdd: async (data) => {
        if (!invoiceProducts) return
        invoiceProducts.set("row_" + (invoiceProducts.size), data[0])
        setInvoice((prev) => { 
          return { 
            ...prev, 
            value: prev.value + parseInt(data[0].totalValue)
          }
        })
      },
      onDelete: async (rowKey) => {
        if (!invoiceProducts) return
        const invoiceProduct = invoiceProducts.get(rowKey)
        if (invoiceProduct) setInvoice((prev) => { 
          return { 
            ...prev, 
            value: prev.value - invoiceProduct.totalValue 
          }
        })
        invoiceProducts.delete(rowKey)
      },
      onEdit: async (rowKey, data) => {
        if (!invoiceProducts) return
        const invoiceProduct = invoiceProducts.get(rowKey)
        if (invoiceProduct) {
          invoiceProducts.set(rowKey, data)
          setInvoice((prev) => { 
            return { 
              ...prev, 
              value: (prev.value - invoiceProduct.totalValue) + parseInt(data.totalValue)
            }
          })
        }
      }
    }
  }, [invoiceProducts, setInvoice])

  return (
    <>
      <DynamicTable 
        initialData={invoiceProducts}
        pageSelected={pageSelected}
        pagesNumber={pagesNumber}
        setPageSelected={setPageSelected}
        config={invoiceProductTableConfig.current}
      />
    </>
  )
}

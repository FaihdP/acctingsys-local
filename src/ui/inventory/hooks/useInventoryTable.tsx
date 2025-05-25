import { useContext, useEffect, useRef, useState } from "react"
import getInvoiceMongoFilter from "@lib/services/invoice/util/getInvoiceMongoFilter"
import { TableConfigProps } from "@ui/table/interfaces/Table"
import { useCallback } from "react"
import { MappedObject } from "@ui/table/interfaces/Row"
import useDebounce from "@ui/core/hooks/useDebounce"
import DEBOUNCE_TIME from "@ui/core/constants/DebounceTime"
import mapData from "@ui/table/util/mapData"
import Expense from "@lib/db/schemas/expense/Exepense"
import { SessionContext } from "@ui/session/hooks/SessionProvider"
import INVENTORY_DEFAULT_COLUMNS from "../constants/InventoryTableColumns"
import IUseInventoryTable from "../interfaces/UseInventoryTable"
import getProducts from "@lib/services/product/getProducts"
import handleSaveProduct from "@lib/controllers/product/handleSaveProduct"
import handleUpdateProduct from "@lib/controllers/product/handleUpdateProduct"

const DEFAULT_PRODUCTS_FILTER: Partial<Expense> = { isDeleted: false }

export default function useInventoryTable(): IUseInventoryTable {
  const { user } = useContext(SessionContext)
  const [products, setProducts] = useState<Map<string, MappedObject> | null>(null)
  const [pageSelected, setPageSelected] = useState<number>(1)
  const pagesNumber = useRef<number>(1)
  const totalRecords = useRef<number>(0)
  const [isVisibleDeleteProductPopup, setIsVisibleDeleteProductPopup] = useState(false)
  const [documentsToDelete, setDocumentsToDelete] = useState<string[]>([])
  
  const [productsFilter, setProductsFilter] = useState<string>("")
  const debouncedProductsFilter = useDebounce(productsFilter, DEBOUNCE_TIME)
  
  const fetchProducts = useCallback(async () => {
    let result;
    result = await getProducts(
      debouncedProductsFilter
        ? getInvoiceMongoFilter(debouncedProductsFilter, DEFAULT_PRODUCTS_FILTER) 
        : DEFAULT_PRODUCTS_FILTER, 
      pageSelected
    )
    pagesNumber.current = result.pages_number
    totalRecords.current = result.total_records
    setProducts(mapData(result.data)) 
  }, [pageSelected, debouncedProductsFilter, isVisibleDeleteProductPopup])
  
  useEffect(() => { fetchProducts() }, [fetchProducts])

  const userColumn = INVENTORY_DEFAULT_COLUMNS.find((expenseColumn) => expenseColumn.tag === 'user')
  if (userColumn) {
    userColumn.defaultValue = {
      name: user.name,
      lastname: user.lastname,
      userId: user.id
    }
  }

  const inventoryTableConfig: TableConfigProps = {
    actions: {
      onAdd: async (data: any) => await handleSaveProduct(data),
      onEdit: async (_: string, data: any) => await handleUpdateProduct(data),
    },
    modifiers: {
      onDeleteRow: async (ids: string[]) => {
        if (ids.length > 0) {
          setDocumentsToDelete(ids)
          setIsVisibleDeleteProductPopup(true)
        }
      },
    },
    header: {
      columns: INVENTORY_DEFAULT_COLUMNS,
      picker: true,
      options: { onEdit: true }
    }
  }

  return {
    products, setProducts,
    pageSelected, setPageSelected,
    pagesNumber,
    productsFilter, setProductsFilter,
    debouncedProductsFilter,
    inventoryTableConfig,
    totalRecords,
    isVisibleDeleteProductPopup, setIsVisibleDeleteProductPopup,
    documentsToDelete, setDocumentsToDelete
  }
}

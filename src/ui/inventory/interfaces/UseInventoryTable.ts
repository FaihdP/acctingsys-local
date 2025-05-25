import { MappedObject } from "@ui/table/interfaces/Row"
import { TableConfigProps } from "@ui/table/interfaces/Table"
import { Dispatch, MutableRefObject, SetStateAction } from "react"

export default interface UseInventoryTable {
  products: Map<string, MappedObject> | null
  setProducts: Dispatch<SetStateAction<Map<string, MappedObject> | null>>
  productsFilter: string
  setProductsFilter: Dispatch<SetStateAction<string>>
  pageSelected: number
  setPageSelected: Dispatch<SetStateAction<number>>
  pagesNumber: MutableRefObject<number>
  debouncedProductsFilter: string
  inventoryTableConfig: TableConfigProps
  totalRecords: MutableRefObject<number>
  isVisibleDeleteProductPopup: boolean
  setIsVisibleDeleteProductPopup: Dispatch<SetStateAction<boolean>>
  documentsToDelete: string[]
  setDocumentsToDelete: Dispatch<SetStateAction<string[]>>
}

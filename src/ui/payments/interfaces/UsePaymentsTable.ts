import { MappedObject } from "@ui/table/interfaces/Row"
import { TableConfigProps } from "@ui/table/interfaces/Table"
import { Dispatch, MutableRefObject, SetStateAction } from "react"

export default interface IUsePaymentsTable {
  payments: Map<string, MappedObject> | null
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
  debouncedFilter: string
  sort: any
  setSort: Dispatch<SetStateAction<any>>
  pageSelected: number
  setPageSelected: Dispatch<SetStateAction<number>>
  pagesNumber: MutableRefObject<number>
  isVisibleBankPopup: boolean
  handleIsVisibleBankPopup: () => void
  tablePaymentsConfig: TableConfigProps
}
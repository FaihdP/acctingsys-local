import { useCallback, useState } from "react"
import { useContext, useEffect, useRef } from "react"
import useDebounce from "@ui/core/hooks/useDebounce"
import DEBOUNCE_TIME from "@ui/core/constants/DebounceTime"
import PAYMENTS_TABLE_COLUMNS from "../constants/PaymentsTableColumns"
import mapData from "@ui/table/util/mapData"
import { SessionContext } from "@ui/session/hooks/SessionProvider"
import getPayments from "@lib/services/payment/getPayments"
import handleSavePayment from "@lib/controllers/payment/handleSavePayment"
import handleUpdatePayment from "@lib/controllers/payment/handleUpdatePayment"
import handleDeletePayment from "@lib/controllers/payment/handleDeletePayment"
import { MappedObject } from "@ui/table/interfaces/Row"
import { TableConfigProps } from "@ui/table/interfaces/Table"
import Payment from "@lib/db/schemas/payment/Payment"
import IUsePaymentsTable from "../interfaces/UsePaymentsTable"
import getMongoFilter from "@lib/util/getMongoFilter"

const DEFAULT_PAYMENTS_FILTER: Partial<Payment> = { isDeleted: false }

export default function usePaymentsTable(): IUsePaymentsTable {
  const [payments, setPayments] = useState<Map<string, MappedObject> | null>(null)
  const [filter, setFilter] = useState<string>("")
  const [sort, setSort] = useState()
  const debouncedFilter = useDebounce(filter, DEBOUNCE_TIME)
  const [pageSelected, setPageSelected] = useState<number>(1)
  const pagesNumber = useRef<number>(1)
  const totalRecords = useRef<number>(0)
  const [isVisibleBankPopup, setIsVisibleBankPopup] = useState<boolean>(false)
  const { user } = useContext(SessionContext)

  const fetchPayments = useCallback(async () => {
    let result;
    result = await getPayments(
      debouncedFilter 
        ? 
          getMongoFilter(
            debouncedFilter, 
            ["date", "value", "invoiceId", "type"], 
            DEFAULT_PAYMENTS_FILTER, 
            ["user.name", "user.lastname"]
          )
        : DEFAULT_PAYMENTS_FILTER,
      pageSelected
    )

    pagesNumber.current = result.pages_number
    totalRecords.current = result.total_records
    setPayments(mapData(result.data)) 
  }, [pageSelected, debouncedFilter])


  useEffect(() => { fetchPayments() }, [fetchPayments])

  const userColumn = PAYMENTS_TABLE_COLUMNS.find((paymentsColumn) => paymentsColumn.tag === 'user');
  if (userColumn) {
    userColumn.defaultValue = {
      name: user.name,
      lastname: user.lastname,
      userId: user.id
    }
  }

  const tablePaymentsConfig: TableConfigProps = {
    actions: {
      onAdd: async (data) => handleSavePayment(data),
      onEdit: async (id, data) => handleUpdatePayment(id, data),
      onDelete: async (_, data) => handleDeletePayment(data._id.$oid)
    },
    header: {
      picker: true, 
      options: {
        onEdit: true
      },
      columns: PAYMENTS_TABLE_COLUMNS
    }
  }

  const handleIsVisibleBankPopup = () => setIsVisibleBankPopup(!isVisibleBankPopup)

  return {
    payments,
    filter,
    setFilter,
    sort,
    setSort,
    debouncedFilter,
    pageSelected,
    setPageSelected,
    pagesNumber,
    isVisibleBankPopup,
    handleIsVisibleBankPopup,
    tablePaymentsConfig,
    totalRecords
  }
}

'use client'

import Payment from "@lib/db/schemas/payment/Payment"
import getInvoices from "@lib/services/invoice/getInvoices"
import getInvoiceMongoFilter from "@lib/services/invoice/util/getInvoiceMongoFilter"
import getPayments from "@lib/services/payment/getPayments"
import InputSearchTable from "@ui/core/components/InputSearchTable"
import DEBOUNCE_TIME from "@ui/core/constants/DebounceTime"
import useDebounce from "@ui/core/hooks/useDebounce"
import PAYMENTS_TABLE_COLUMNS from "@ui/payments/constants/PaymentsTableColumns"
import DynamicTable from "@ui/table/containers/DynamicTable"
import { MappedObject } from "@ui/table/interfaces/Row"
import { TableConfigProps } from "@ui/table/interfaces/Table"
import mapData from "@ui/table/util/mapData"
import { useCallback, useEffect, useRef, useState } from "react"

const DEFAULT_PAYMENTS_FILTER: Partial<Payment> = {
  isDeleted: false
}

export default function Payments() {
  const [payments, setPayments] = useState<Map<string, MappedObject> | null>(null)
  const [filter, setFilter] = useState<string>("")
  const [sort, setSort] = useState()
  const debouncedFilter = useDebounce(filter, DEBOUNCE_TIME)
  const [pageSelected, setPageSelected] = useState<number>(1)
  const pagesNumber = useRef<number>(1)

  const fetchPayments = useCallback(async () => {
    let result;
    result = await getPayments(
      DEFAULT_PAYMENTS_FILTER, 
      pageSelected
    )

    pagesNumber.current = result.pages_number
    setPayments(mapData(result.data)) 
  }, [pageSelected])

  useEffect(() => { fetchPayments() }, [fetchPayments])

  const tablePaymentsConfig: TableConfigProps = {
    header: {
      picker: true, 
      options: {
        onEdit: true
      },
      columns: PAYMENTS_TABLE_COLUMNS
    }
  }
  
  return (
    <>
      <InputSearchTable 
        data={payments}
        filter={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <DynamicTable 
        config={tablePaymentsConfig}
        initialData={payments} 
        pageSelected={pageSelected} 
        pagesNumber={pagesNumber}   
        setPageSelected={setPageSelected}   
      />
    </>
  )
}

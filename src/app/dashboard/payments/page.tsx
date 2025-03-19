'use client'

import Payment from "@lib/db/schemas/payment/Payment"
import getPayments from "@lib/services/payment/getPayments"
import InputSearchTable from "@ui/core/components/InputSearchTable"
import DEBOUNCE_TIME from "@ui/core/constants/DebounceTime"
import useDebounce from "@ui/core/hooks/useDebounce"
import PAYMENTS_TABLE_COLUMNS from "@ui/payments/constants/PaymentsTableColumns"
import DynamicTable from "@ui/table/containers/DynamicTable"
import { MappedObject } from "@ui/table/interfaces/Row"
import { TableConfigProps } from "@ui/table/interfaces/Table"
import mapData from "@ui/table/util/mapData"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import bankIcon from "@public/dashboard/payment/bank_icon.svg"
import BankPopup from "@ui/payments/components/BankPopup"

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
  const [isVisibleBankPopup, setIsVisibleBankPopup] = useState<boolean>(true)

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
    actions: {
      onEdit: async (id, data) => {}
    },
    header: {
      picker: true, 
      options: {
        onEdit: true
      },
      columns: PAYMENTS_TABLE_COLUMNS
    }
  }

  const handleIsVisibleBankPopup = () => {
    setIsVisibleBankPopup(!isVisibleBankPopup)
  }
  
  return (
    <>
      <div className="flex flex-row justify-between relative">
        <InputSearchTable 
          data={payments}
          filter={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div>
          <button 
            onClick={handleIsVisibleBankPopup}
            className="
              h-[40px]
              bg-[#F4F4F4]
              placeholder-[#7A7A7A]
              shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
              border
              rounded-lg 
              text-sm
              px-3
              relative
            "
          >
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3 select-none">
              <Image
                src={bankIcon.src}
                alt={bankIcon.alt}
                width={bankIcon.width}
                height={bankIcon.height}
              />
            </div>
            <span className="ps-8">Bancos</span>
          </button>
        </div>
        { isVisibleBankPopup && <BankPopup /> }
      </div>
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

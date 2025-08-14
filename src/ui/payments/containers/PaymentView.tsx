import InputSearchTable from "@ui/core/components/InputSearchTable"
import DynamicTable from "@ui/table/containers/DynamicTable"
import bankIcon from "@public/dashboard/payment/bank_icon.svg"
import BankPopup from "@ui/payments/components/BankPopup"
import { MutableRefObject } from "react"
import usePaymentsTable from "@ui/payments/hooks/usePaymentsTable"
import Image from "next/image"

export default function PaymentView() {
  const { 
    payments, 
    filter, 
    pageSelected, 
    pagesNumber, 
    isVisibleBankPopup, 
    handleIsVisibleBankPopup, 
    tablePaymentsConfig,
    setFilter,
    setPageSelected,  
    totalRecords
  } = usePaymentsTable()

  return (
    <>
      <div className="flex flex-row justify-between relative">
        <InputSearchTable 
          data={payments}
          filter={filter}
          onChange={(e) => setFilter(e.target.value)}
          totalRecords={totalRecords.current}
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
                alt={"bank icon"}
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
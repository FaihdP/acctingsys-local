import { ColumType } from "@ui/table/interfaces/Table"
import INVOICE_STATUS_COLORS from "../constants/InvoiceStatusColors"
import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus"
import { useContext } from "react"
import { InvoicePopupContext } from "../hooks/InvoicePopupProvider"
import { formatToDatetimeLocal } from "@lib/util/time"
import DatetimeInput from "@ui/core/components/DatetimeInput"
import COLORS from "@ui/core/util/colors"
import Image from "next/image"
import Backdrop from "@ui/core/components/Backdrop"
import ClockIcon from "@public/dashboard/clock.svg"
import PaymentsIcon from "@public/dashboard/nav/PaymentsIcon";
import SteppersIcon from "@public/dashboard/steppers.svg";
import AcountCircleIcon from "@public/login/account_circle.svg"
import getInvoiceStatus from "@lib/services/invoice/util/getInvoiceStatus"
import Popover, { renderOptions } from "@ui/core/components/Popover"

const columnsFields = ["name", "lastname"]

export default function InvoiceForm() {
  const { 
    handleInputChange, 
    invoice, 
    clients,
    errors, 
    setErrors,
    isVisiblePersonPopup,
    isVisibleStatusPopup,
    filterClient,
    handleIsVisiblePersonPopup,
    handleIsVisibleStatusPopup,
    handleInputClientChange,
    handleInputClientFilterChange,
    handleInputStatusChange
  } = useContext(InvoicePopupContext)

  const invoiceStatus = getInvoiceStatus(invoice)

  const colors = INVOICE_STATUS_COLORS.get(invoiceStatus as INVOICE_STATUS)

  return (
    <>
      <div className="columns-2 mt-[40px]">
        {/* Column 1 */}
        <div className="flex flex-col">
          <div>
            <DatetimeInput 
              defaultValue={() => formatToDatetimeLocal(invoice.date)}
              className="w-[350px]"
              onChange={handleInputChange}
              image={{
                src: ClockIcon.src,
                alt: "clock_icon",
                height: 24,
                width: 24
              }}
            />
          </div>
        </div>
        {/* Column 2 */}
        <div className="flex flex-col">
          <div className="flex flex-row">
            <label className="w-full relative">
              <div className="
                absolute 
                inset-y-0 start-0 
                flex items-center 
                pointer-events-none select-none 
                ps-3 
                text-[#7A7A7A]
              ">
                <PaymentsIcon width={27} height={27} />
              </div>
              <input 
                type="number" 
                value={invoice.value}
                onChange={(e) => {
                  handleInputChange("value", e.target.value ? parseInt(e.target.value) : e.target.value)
                }}
                step={50} 
                min={0} 
                className={`
                  w-full
                  ps-12 py-[10px] pe-3
                  rounded-lg
                  bg-[#F4F4F4]
                  placeholder-[#7A7A7A]
                  shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
                `}
              />
            </label>
            <div className={`
              absolute
              text-sm 
              xl:w-96
              w-56
              left-[86%]
              top-[12%]
              text-[#7A7A7A] 
              bg-white 
              rounded-lg 
              shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
              transition-opacity ${ errors && errors.get("totalValue") ? "opacity-1" : "opacity-0" }
            `}>
              <div className="p-3">
                <div className="flex flex-row ">
                  <div>
                    Las facturas con estado <span 
                      className="inline-block mx-1 rounded-lg px-[6px] py-[2px] whitespace-nowrap" 
                      style={{ background: "#FB8383", color: "#922323" }}
                    >
                      En deuda
                    </span>
                    o
                    <span 
                      className="inline-block mx-1 rounded-lg px-[6px] py-[2px]" 
                      style={{ background: COLORS.GREEN, color: "#0D6948" }}
                    >
                      Pagada
                    </span>
                    deben tener un valor mayor a 0
                  </div>  
                  <div>
                    <button 
                      onClick={() => setErrors(new Map(errors).set("totalValue", false))} 
                      className="
                        ms-[10px]
                        cursor-pointer 
                        inline 
                        text-inherit
                      "
                    >
                      ⨉
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="columns-2 mt-[25px]">
        {/* Column 1 */}
        <div 
          className={`relative ${isVisiblePersonPopup ? "z-10" : ""}`}
          onClick={() => handleIsVisiblePersonPopup()}
        >
          <div className="
            absolute 
            inset-y-0 start-0 
            flex items-center 
            pointer-events-none select-none 
            ps-3 
            text-[#7A7A7A]
          ">
            <Image
              alt="Person in circle icon"
              src={AcountCircleIcon.src}
              width={27}
              height={27}
            />
          </div>
          <div 
            className={`
              w-[350px]
              h-[44px]
              ps-12 py-[10px] pe-3
              rounded-lg
              bg-[#F4F4F4]
              placeholder-[#7A7A7A]
              shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
            `}
          >
            { 
              invoice.person &&
                <span
                  className="rounded-lg px-[6px] py-[2px] bg-slate-200 text-[#5C5C5C]" 
                  onClick={(e) => e.stopPropagation()}
                > 
                  { invoice.person ? <>{ invoice.person.name + " " + invoice.person.lastname }</> : ""  }
                  <button 
                    onClick={() => handleInputClientChange(null)}
                    className="
                      ms-2
                      cursor-pointer 
                      inline 
                      text-slate-400
                    "
                  >
                    ⨉
                  </button>
                </span>
            }
          </div>
        </div>
        {
          isVisiblePersonPopup &&
            <div className="text-[12px] text-[#5C5C5C]">
              <Popover 
                filter={filterClient}
                options={clients}
                columnType={ColumType.OBJECT}
                columnFields={columnsFields}
                onChangeFilter={handleInputClientFilterChange}
                onChangeVisiblePopover={handleIsVisiblePersonPopup}
                onChange={handleInputClientChange}
              />  
            </div>
        }
        {/* Column 2 */}
        <div 
          className={`relative ${isVisibleStatusPopup ? "z-10" : ""}`}
          onClick={() => {
            if (isVisibleStatusPopup) return
            handleIsVisibleStatusPopup()
          }}
        >
          <div className="
            absolute 
            inset-y-0 start-0 
            flex items-center 
            pointer-events-none select-none 
            ps-3 
            text-[#7A7A7A]
          ">
            <Image
              alt="Person in circle icon"
              src={SteppersIcon.src}
              width={24}
              height={24}
            />
          </div>
          <div 
            className={`
              w-full
              h-[44px]
              ps-12 py-[10px] pe-3
              rounded-lg
              bg-[#F4F4F4]
              placeholder-[#7A7A7A]
              shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
            `}
          >
            <span
              className={`
                rounded-lg 
                px-[6px] 
                py-[2px]
              `}
              style={{ 
                background: colors ? colors.background : "", 
                color: colors ? colors.fontColor : "" 
              }}
            >
              { invoiceStatus }
              { 
                invoiceStatus !== "Creada" && 
                  <button 
                    onClick={() => handleInputChange("isPaid", false)} 
                    className="
                      ms-1 
                      cursor-pointer 
                      inline 
                      text-inherit
                    "
                  >
                    ⨉
                  </button>
              }
            </span>
          </div>
        </div>
        { 
          isVisibleStatusPopup &&
            <div className="text-[12px] text-[#5C5C5C]">
              <Popover 
                options={Array.from(INVOICE_STATUS_COLORS, ([key, value]) => { return { key, colors: value } })}
                columnType={ColumType.SELECT}
                columnFields={columnsFields}
                onChangeVisiblePopover={handleIsVisibleStatusPopup}
                onChange={handleInputStatusChange}
              />  
            </div>
        }
      </div>
    </>
  )
}
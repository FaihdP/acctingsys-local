'use client'

import Image from "next/image";
import addCircleIcon from "@public/dashboard/add_circle.svg"
import { BankDocument } from "@lib/db/schemas/bank/Bank";
import Spin from "@ui/core/components/Spin";
import EditIcon from "@public/core/EditIcon";
import AcceptIcon from "@public/dashboard/table_accept.svg"
import CancelIcon from "@public/core/table_cancel.svg"
import trashCanIcon from "@public/dashboard/delete.svg"
import useBankPopup from "../hooks/useBankPopup";

export default function BankPopup() {
  const {
    banks,
    setBank,
    bank,
    error,
    handleChangeBank,
    handleSaveOrUpdate,
    handleDelete,
    setError,
    handleCloseModal
  } = useBankPopup()

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className="
        right-0
        absolute
        w-[400px] 
        h-[200px] 
        bg-white 
        z-10 
        top-[40px]
        shadow-[0_0_30px_0px_rgba(0,0,0,0.2)]
        rounded-lg
        cursor-default
        text-[14px]
      "
    >
      <div className="border-b px-2 border-gray-100 flex flex-row justify-between py-1">
        {/* <input 
          value={""}
          onChange={() => {}}
          type="text" 
          autoComplete="off"
          name="search_client" 
          placeholder="Busca una opción..."
          className="w-full h-[30px] text-[12px] ps-3 focus:outline-0"
        /> */}
        <button 
          className="ms-auto"
          onClick={() => setBank({
            name: "",
            fontColor: "000000",
            backgroundColor: "E2E8F0"
          })}
        >
          <Image 
            src={addCircleIcon.src}
            alt={"Circle add icon"}
            width={20}
            height={20}
          />
        </button>
      </div>
      {
        bank !== undefined &&
          <div className="border-b border-gray-100 py-[10px] px-5 text-[14px]">
            <div className="flex flex-row items-center">
              <input 
                type="text" 
                value={bank.name}
                onChange={(e) => setBank((prevBank) => {
                  return {
                    ...prevBank,
                    name: e.target.value
                  } as BankDocument
                })}
                placeholder="Escribe aquí..."
                className="rounded-xl px-3 py-1 focus:outline-0 block" 
                style={{
                  color: "#" + bank.fontColor,
                  background: "#" + bank.backgroundColor,
                }}
              />
              { error && <span className="text-[#f87171] text-[10px] ms-2">{ error }</span> }
            </div>
            <div className="mt-[10px] flex flex-row justify-between">
              <div className="flex">
                <label className="flex items-center">
                  <input 
                    type="color" 
                    className="rounded-full w-[24px] h-[24px]" 
                    value={"#" + bank.fontColor} 
                    // Substring function deletes the '#' caracter
                    onChange={(e) => handleChangeBank("fontColor", e.target.value.substring(1))}
                  />
                  Letra
                </label>
                <label className="flex items-center ms-[20px]">
                  <input 
                    type="color" 
                    className="rounded-full w-[24px] h-[24px]" 
                    value={"#" + bank.backgroundColor}
                    onChange={(e) => handleChangeBank("backgroundColor", e.target.value.substring(1))}
                  />
                  Fondo
                </label>
              </div>
              <div className="flex flex-row">
                <button onClick={handleSaveOrUpdate}>
                  <Image
                    src={AcceptIcon.src}
                    alt="accept_icon"
                    width={20}
                    height={20}
                  />
                </button>
                <button onClick={() => {
                  setError(undefined)
                  handleCloseModal()
                }}>
                  <Image
                    className="ms-[6px]"
                    src={CancelIcon.src}
                    alt="cancel_icon"
                    width={20}
                    height={20}
                  />
                </button>
                { 
                  '_id' in bank &&
                    <button onClick={handleDelete}>
                      <Image
                        className="ms-[6px]"
                        src={trashCanIcon.src}
                        alt="Trash can icon"
                        width={20}
                        height={20}
                      />
                    </button>
                }
              </div>
            </div>
          </div>
      }
      <div className="p-[12px]">
        {
          banks 
            ? banks.map((bank, index) => 
              <span
                key={index}
                className="inline-flex mx-1 rounded-lg px-[6px] items-center"
                style={{
                  background: "#" + bank.backgroundColor,
                  color: "#" + bank.fontColor
                }}
              >
                { bank.name }
                <button 
                  onClick={() => setBank(bank)} 
                  className="
                    ms-1 
                    cursor-pointer 
                    inline 
                    text-inherit
                  "
                >
                  <EditIcon classname="w-[16px] h-[16px]" />
                </button>
              </span>
              )
            : <span className="flex justify-center items-center my-1">
                <Spin size={14} className="me-3" />
              </span> 
        }
      </div>
    </div>
  )
}

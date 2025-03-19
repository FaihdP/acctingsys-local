'use client'

import Image from "next/image";
import addCircleIcon from "@public/dashboard/add_circle.svg"
import { useEffect, useState } from "react";
import Bank, { BankDocument } from "@lib/db/schemas/bank/Bank";
import getBanks from "@lib/services/bank/getBanks";
import Spin from "@ui/core/components/Spin";
import EditIcon from "@public/core/EditIcon";

export default function BankPopup() {
  const [banks, setBanks] = useState<BankDocument[]>()
  const [bank, setBank] = useState<BankDocument | Bank>()

  useEffect(() => {
    async function fetchBanks() {
      setBanks((await getBanks()).data)
    }
    fetchBanks()
  }, [setBanks])

  const handleChangeBank = (field: string, value: string) => {
    setBank((prevBank) => {
      return { ...prevBank, [field]: value } as BankDocument
    })
  }

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
      <div className="border-b px-2 border-gray-100 flex flex-row justify-between">
        <input 
          value={""}
          onChange={() => {}}
          type="text" 
          autoComplete="off"
          name="search_client" 
          placeholder="Busca una opción..."
          className="w-full h-[30px] text-[12px] ps-3"
        />
        <button onClick={() => setBank({
          name: "",
          fontColor: "",
          backgroundColor: "E2E8F0"
        })}>
          <Image 
            src={addCircleIcon.src}
            alt={addCircleIcon.alt}
            width={20}
            height={20}
          />
        </button>
      </div>
      {
        bank !== undefined &&
          <div className="border-b border-gray-100 py-[10px] px-5 text-[14px]">
            <input 
              type="text" 
              value={bank.name}
              onChange={(e) => setBank((prevBank) => {
                return {
                  ...prevBank,
                  name: e.target.value
                } as any
              })}
              placeholder="Escribe aquí..."
              className="rounded-xl px-3 py-1 focus:outline-0 block" 
              style={{
                color: "#" + bank.fontColor,
                background: "#" + bank.backgroundColor,
              }}
            />
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
              <div>
                + x
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
                <Spin size={14} />
              </span> 
        }
      </div>
    </div>
  )
}

import Input from "@ui/core/components/Input";
import DynamicTable from "@ui/table/containers/DynamicTable";
import { PersonDocument } from "@lib/db/schemas/person/Person";
import { MappedObject } from "@ui/table/interfaces/Row";
import { TableConfigProps } from "@ui/table/interfaces/Table";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

export default function PersonPopupForm({ 
  person,
  handleInputChange,
  handleDebtChange,
  phones,
  pageSelected,
  setPageSelected,
  pagesNumber,
  tablePhonesTableConfig
}: { 
  person: PersonDocument,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleDebtChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  phones: Map<string, MappedObject> | null,
  pageSelected: number,
  setPageSelected: Dispatch<SetStateAction<number>>,
  pagesNumber: MutableRefObject<number>,
  tablePhonesTableConfig: TableConfigProps
}) {
  return (
    <div className="mt-[50px] h-[100%] gap-14">
      <div className="h-[100%]">
        <Input 
          name="id" 
          type="text" 
          placeholder="*Identificación" 
          className="
            bg-[#F4F4F4] 
            placeholder-[#7A7A7A] 
            ps-12 py-[10px] pe-3
            w-[400px] 
            shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
          "
          value={person.id} 
          onChange={handleInputChange} 
        />
        <Input 
          name="name" 
          type="text" 
          placeholder="*Nombres" 
          className="
            bg-[#F4F4F4] 
            placeholder-[#7A7A7A] 
            mt-[25px]
            ps-12 py-[10px] pe-3 
            w-[400px] 
            shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
          "
          value={person.name} 
          onChange={handleInputChange} 
        />
        <Input 
          name="lastname" 
          type="text" 
          placeholder="*Apellidos" 
          className="
            bg-[#F4F4F4] 
            placeholder-[#7A7A7A] 
            mt-[25px]
            ps-12 py-[10px] pe-3 
            w-[400px] 
            shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
          "
          value={person.lastname} 
          onChange={handleInputChange} 
        />
        <div className="flex flex-row items-center mt-[25px]">
        <span className="text-[#7A7A7A]">Deuda maxima</span>
          <Input 
            name="maxValue" 
            type="text" 
            placeholder="Valor" 
            className="
              bg-[#F4F4F4] 
              placeholder-[#7A7A7A] 
              ps-12 py-[10px] pe-3 
              ms-[20px]
              shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
            "
            value={person.debt?.maxValue} 
            onChange={handleDebtChange} 
          />
        </div>
        <div className="flex flex-row items-center mt-[25px]">
          <span className="text-[#7A7A7A]">Deuda actual</span>
          <Input 
            name="maxDebt" 
            type="text" 
            disabled
            placeholder="Valor" 
            className="
              bg-[#F4F4F4] 
              placeholder-[#7A7A7A] 
              ps-12 py-[10px] pe-3 
              ms-[32px]
              shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
            "
            value={""} 
            onChange={handleInputChange} 
          />
        </div>
        <div className="flex flex-row items-center mt-[25px]">
          <Input 
            name="phone" 
            type="text" 
            placeholder="Telefono" 
            className="
              bg-[#F4F4F4] 
              placeholder-[#7A7A7A] 
              ps-12 py-[10px] pe-3 
              w-[400px] 
              shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
            "
            value={Array.isArray(person.phone) ? person.phone.join(", ") : person.phone} 
            onChange={handleInputChange} 
          />
        </div>
      </div>
      {/* <div className="h-[100%] text-[#7A7A7A]">
        <DynamicTable 
          config={tablePhonesTableConfig}
          initialData={phones}
          pageSelected={pageSelected}
          pagesNumber={pagesNumber}
          setPageSelected={setPageSelected}
        />
      </div> */}
    </div>
  )
}
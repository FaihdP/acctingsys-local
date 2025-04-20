import { ChangeEvent } from "react";
import Input from "./Input";
import SearchIcon from "@public/dashboard/search.svg"
import Spin from "./Spin";

export default function InputSearchTable({
  data,
  filter,
  onChange
}: {
  data: Map<string, any> | null,
  filter: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="flex flex-col md:flex-row mb-4 md:mb-[40px]">
      <Input 
        type="text" 
        name="search" 
        value={filter}
        onChange={onChange} 
        placeholder="Buscar..." 
        className="
          h-[40px]
          w-full
          md:w-[444px]
          bg-[#F4F4F4]
          placeholder-[#7A7A7A]
          shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
        "
        styles={{
          fontSize: '16px',
          userSelect: "none"
        }}
        image={{
          alt: 'search_icon',
          src: SearchIcon.src,
          height: 24,
          width: 24
        }}
      /> 
      <span className="mt-2 md:mt-0 md:ms-[24px] text-sm md:text-base truncate">
        { data ? data.size : <Spin size={9} className="!me-1" /> } elemento{ !data || data.size > 1 ? "s" : "" } • Ordenado por Fecha de venta • Filtrado por "Ejemplo"
      </span>
    </div>
  )
}

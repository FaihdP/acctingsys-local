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
    <div className="flex flex-row mb-[40px]">
      <Input 
        type="text" 
        name="search" 
        value={filter}
        onChange={onChange} 
        placeholder="Buscar..." 
        className="
          h-[40px]
          w-[450px]
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
      <span className="ms-[24px]">{ data ? data.size : <Spin size={9} className="!me-1" /> } elemento{ !data || data.size > 1 ? "s" : "" } • Ordenado por Fecha de venta • Filtrado por “Ejemplo”</span>
    </div>
  )
}

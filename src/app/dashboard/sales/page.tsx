'use client'

import SearchIcon from "@public/dashboard/search.svg"
import Input from "@ui/core/components/Input"

export default function Sales() {
  return (
    <>
      <div className="flex flex-row mb-[40px]">
        <Input 
          type="text" 
          name="search_invoice" 
          value="" 
          onChange={() => {}} 
          placeholder="Buscar..." 
          className="
            bg-[#F4F4F4]
            w-[450px]
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
        <span className="ms-[24px]">50 elementos • Ordenado por Fecha de venta • Filtrado por “Ejemplo”</span>
      </div>
    </>
  )
}

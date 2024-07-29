import Image from "next/image";
import { MouseEvent } from "react";
import deleteIcon from "@public/dashboard/delete.svg"
import addCircleIcon from "@public/dashboard/add_circle.svg"

export default function TableFooter(
  { 
    onAdd, 
    onDelete 
  }: { 
    onAdd: ((e: MouseEvent<HTMLAnchorElement>) => void) | (() => void),
    onDelete?: () => Promise<any>
  }) {
  return (
    <div 
      className="
        flex 
        justify-between
        items-center
        mt-auto
        w-full
        h-[35px]
        px-[16px]
        shadow-[0_-1px_3px_-1px_rgba(0,0,0,0.5)] 
      " 
      style={{ fontSize: "16px" }}
    >
      { onAdd && 
          <a 
            href="#" 
            onClick={onAdd}
            className="flex items-center"
          > 
            <div className="inline-block me-[5px]">
              <Image
                src={addCircleIcon.src}
                alt={"add_circle_icon"}
                width={20}
                height={20}
              />
            </div>
            Agregar
          </a> }

      { onDelete && 
          <a 
            href="#"
            className="flex items-center"
          >
            <div className="inline-block me-[5px]">
              <Image
                src={deleteIcon.src}
                alt={"add_circle_icon"}
                width={20}
                height={20}
              />
            </div>
            Eliminar
          </a> } 
    </div>
    
    
  )
}

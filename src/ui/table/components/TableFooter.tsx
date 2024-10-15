import Image from "next/image";
import { MouseEvent } from "react";
import deleteIcon from "@public/dashboard/delete.svg"
import addCircleIcon from "@public/dashboard/add_circle.svg"
import arrowLeftIcon from "@public/dashboard/table_arrow_left.svg"
import arrowRightIcon from "@public/dashboard/table_arrow_right.svg"
import doubleArrowRightIcon from "@public/dashboard/table_double_arrow_right.svg"
import doubleArrowLeftIcon from "@public/dashboard/table_double_arrow_left.svg"
import getPagesNumberArray from "../util/getPagesNumberArray";

interface TableFooterProps {
  onAddRow: ((e: MouseEvent<HTMLAnchorElement>) => void) | (() => void),
  onDeleteRow?: ((e: MouseEvent<HTMLAnchorElement>) => void) | (() => void),
  pageSelected: number,
  onPageSelectedChange: (pageNumber: number) => void,
  pagesNumber: number
}

export default function TableFooter(
  { 
    onAddRow,
    onDeleteRow,
    pageSelected,
    onPageSelectedChange,
    pagesNumber,
  }: TableFooterProps) {
  return (
    <div 
      className="
        flex 
        justify-between
        items-center
        w-full
        h-[35px]
        px-[16px]
        shadow-[0_-1px_3px_-1px_rgba(0,0,0,0.5)] 
        mt-auto
      " 
      style={{ fontSize: "16px" }}
    >
      { onAddRow && 
          <a 
            href="#" 
            onClick={onAddRow}
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

      <div className="text-[14px] flex flex-row">
        {
          pageSelected !== 1 
            ? <>
              <a onClick={() => onPageSelectedChange(1)} className="cursor-pointer">
                <Image
                  src={doubleArrowLeftIcon.src}
                  alt={"double_arrow_right_icon"}
                  width={24}
                  height={24}
                />
              </a>
              <a onClick={() => onPageSelectedChange(pageSelected - 1)} className="cursor-pointer"> 
                <Image
                  src={arrowLeftIcon.src}
                  alt={"arrow_left_icon"}
                  className="me-[10px]"
                  width={24}
                  height={24}
                />
              </a>
            </>
            : <div className="w-[48px] me-[10px]"></div>
        }
        <div className="min-w-[72px] grid grid-flow-col gap-[7px] text-center justify-center">
          { 
            getPagesNumberArray(pageSelected, pagesNumber).map((pageNumber, index) => {
              const colorsArray = [
                '#7A7A7A',
                'rgba(122, 122, 122, 0.6)',
                'rgba(122, 122, 122, 0.4)',
                'rgba(122, 122, 122, 0.2)',
                'rgba(122, 122, 122, 0.1)',
              ]
              return (
                <a 
                  key={index}
                  style={{ color: colorsArray[Math.abs(pageSelected - pageNumber)] }}
                  className={`
                    cursor-pointer 
                    flex 
                    items-center
                  `}
                  onClick={() => onPageSelectedChange(pageNumber)}
                >
                  { pageNumber }
                </a>
              ) 
            })
          }
        </div>
        {
          pageSelected !== pagesNumber 
            ? <>
              <a onClick={() => onPageSelectedChange(pageSelected + 1)} className="cursor-pointer">
                <Image
                  src={arrowRightIcon.src}
                  alt={"arrow_right_icon"}
                  className="ms-[10px]"
                  width={24}
                  height={24}
                />
              </a>
              <a onClick={() => onPageSelectedChange(pagesNumber)} className="cursor-pointer">
                <Image
                  src={doubleArrowRightIcon.src}
                  alt={"double_arrow_right_icon"}
                  width={24}
                  height={24}
                />
              </a>
            </>
            : <div className="w-[48px] ms-[10px]"></div>
        }
        
      </div>

      { onDeleteRow && 
          <a 
            href="#"
            onClick={onDeleteRow}
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

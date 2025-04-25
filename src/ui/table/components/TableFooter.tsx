import Image from "next/image";
import deleteIcon from "@public/dashboard/delete.svg"
import addCircleIcon from "@public/dashboard/add_circle.svg"
import arrowLeftIcon from "@public/dashboard/table_arrow_left.svg"
import arrowRightIcon from "@public/dashboard/table_arrow_right.svg"
import doubleArrowRightIcon from "@public/dashboard/table_double_arrow_right.svg"
import doubleArrowLeftIcon from "@public/dashboard/table_double_arrow_left.svg"
import getPagesNumberArray from "../util/getPagesNumberArray";
import { useTable } from "../hooks/useTable";
import { ReactNode } from "react";

interface AddButtonProps {
  onClick: () => void;
  customComponent?: ReactNode;
}

interface DeleteButtonProps {
  onClick: () => void;
  customComponent?: ReactNode;
}

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const AddButton = ({ onClick, customComponent }: AddButtonProps) => (
  <a onClick={onClick} className="flex items-center cursor-pointer me-[5px]">
    {customComponent || ( 
      <>
        <div className="inline-block ">
          <Image
          src={addCircleIcon.src}
          alt="add_circle_icon"
          width={20}
          height={20}
          />
        </div>
        Agregar
      </>
    )}
  </a>
);

const DeleteButton = ({ onClick, customComponent }: DeleteButtonProps) => (
  <a onClick={onClick} className="flex items-center cursor-pointer">
    {customComponent || (
      <>
        <div className="inline-block">
          <Image
            src={deleteIcon.src}
            alt="delete_icon"
            width={20}
            height={20}
          />
        </div>
        Eliminar
      </>
    )}
  </a>
);

const PaginationControls = ({ currentPage, totalPages, onPageChange }: PaginationControlsProps) => {
  const pages = getPagesNumberArray(currentPage, totalPages);
  const colorsArray = [
    '#7A7A7A',
    'rgba(122, 122, 122, 0.6)',
    'rgba(122, 122, 122, 0.4)',
    'rgba(122, 122, 122, 0.2)',
    'rgba(122, 122, 122, 0.1)',
  ];

  return (
    <div className="text-[14px] flex flex-row">
      {currentPage !== 1 ? (
        <>
          <a onClick={() => onPageChange(1)} className="cursor-pointer">
            <Image
              src={doubleArrowLeftIcon.src}
              alt="double_arrow_left_icon"
              width={24}
              height={24}
            />
          </a>
          <a onClick={() => onPageChange(currentPage - 1)} className="cursor-pointer">
            <Image
              src={arrowLeftIcon.src}
              alt="arrow_left_icon"
              className="me-[10px]"
              width={24}
              height={24}
            />
          </a>
        </>
      ) : (
        <div className="w-[48px] me-[10px]"></div>
      )}

      <div className="min-w-[72px] grid grid-flow-col gap-[7px] text-center justify-center">
        {pages.map((pageNumber, index) => (
          <a
            key={index}
            style={{ color: colorsArray[Math.abs(currentPage - pageNumber)] }}
            className="cursor-pointer flex items-center"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        ))}
      </div>

      {currentPage < totalPages ? (
        <>
          <a onClick={() => onPageChange(currentPage + 1)} className="cursor-pointer">
            <Image
              src={arrowRightIcon.src}
              alt="arrow_right_icon"
              className="ms-[10px]"
              width={24}
              height={24}
            />
          </a>
          <a onClick={() => onPageChange(totalPages)} className="cursor-pointer">
            <Image
              src={doubleArrowRightIcon.src}
              alt="double_arrow_right_icon"
              width={24}
              height={24}
            />
          </a>
        </>
      ) : (
        <div className="w-[48px] ms-[10px]"></div>
      )}
    </div>
  );
};

export default function TableFooter() {
  const {
    actions,
    modifiers,
    pageSelected,
    setPageSelected,
    pagesNumber,
    handleDeleteRow,
    handleAddRow
  } = useTable();

  return (
    <div
      className="flex justify-between items-center w-full h-[35px] px-[16px] shadow-[0_-1px_3px_-1px_rgba(0,0,0,0.5)] mt-auto"
      style={{ fontSize: "16px" }}
    >
      {
        (actions?.onAdd || modifiers?.onAddRow) ? (
          <AddButton 
            onClick={handleAddRow} 
            customComponent={modifiers?.onAddRowComponent}
          />
        ) : (
          <div></div>
        )
      }
      
      <PaginationControls
        currentPage={pageSelected}
        totalPages={pagesNumber.current}
        onPageChange={setPageSelected}
      />
      
      {(actions?.onDelete || modifiers?.onDeleteRow) ? (
        <DeleteButton
          onClick={handleDeleteRow}
          customComponent={modifiers?.onDeleteRowComponent}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

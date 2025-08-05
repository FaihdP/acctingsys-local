import { PersonDocument, PersonType } from "@lib/db/schemas/person/Person";
import Image from "next/image";
import { createPortal } from "react-dom";
import addCircleIcon from "@public/dashboard/add_circle.svg"
import PersonPopupForm from "./PersonPopupForm";
import handleSavePerson from "@lib/controllers/person/handleSavePerson";
import usePerson from "../hooks/usePerson";
import usePersonsPhonesTable from "../hooks/usePersonsPhonesTable";
import handleUpdatePerson from "@lib/controllers/person/handleUpdatePerson";

interface PersonPopupProps {
  initialPerson: PersonDocument,
  personType: PersonType,
  isVisible: boolean,
  onClose: () => void
}

export default function PersonPopup({ 
  initialPerson,
  personType, 
  isVisible, 
  onClose 
}: PersonPopupProps) {
  const {
    person,
    handleInputChange,
    handleDebtChange
  } = usePerson(initialPerson)

  const { 
    phones, 
    pagesNumber, 
    pageSelected, 
    setPageSelected, 
    tablePhonesTableConfig 
  } = usePersonsPhonesTable(person?._id?.$oid)
  
  if (!isVisible) return <></>

  return createPortal(
    <div
      className="
        absolute 
        w-[100vw] 
        h-[100vh] 
        top-0 
        left-0 
        cursor-default 
        flex
        justify-center
        items-center
        bg-[rgba(0,0,0,0.26)]
        shadow-[0_0_30px_0px_rgba(0,0,0,0.25)]
      "
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="
          w-[1024px]
          h-[80%]
          rounded-lg
          bg-white
          flex
          flex-col
          items-center
          py-5
          pb-[25px]
          px-[80px]
          relative
        "
      >
        <span className="text-[30px]">
          Crea un { personType === PersonType.CLIENT ? "cliente" : "proveedor" }
        </span>
        <div className="absolute flex w-full justify-end">
          <button 
            className="
              flex 
              items-center 
              text-[#7A7A7A] 
              bg-[#F4F4F4] 
              ps-[8px]
              pe-[10px] 
              py-[5px] 
              rounded-lg 
              shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
              me-[30px]
            "
            onClick={async () => {
              try {
                if (!initialPerson._id.$oid) await handleSavePerson(person, phones)
                else await handleUpdatePerson(person)
              } catch (error) {
                console.log(error)
              }
              onClose()
            }}
          >
            <div className="inline-block me-[5px]">
              <Image
                src={addCircleIcon.src}
                alt={"add_circle_icon"}
                width={20}
                height={20}
              />
            </div>
            Guardar
          </button>
          <button 
            className="cursor-pointer text-[#7A7A7A] text-[20px] me-7"
            onClick={() => onClose()}
          >
            ⨉
          </button>
        </div>
        <PersonPopupForm 
          person={person} 
          handleInputChange={handleInputChange}
          handleDebtChange={handleDebtChange}
          phones={phones}
          pageSelected={pageSelected}
          setPageSelected={setPageSelected}
          pagesNumber={pagesNumber}
          tablePhonesTableConfig={tablePhonesTableConfig}
        />
      </div>  
    </div>,
    document.body
  )
}
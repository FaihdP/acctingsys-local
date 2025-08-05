import InputSearchTable from "@ui/core/components/InputSearchTable";
import DynamicTable from "@ui/table/containers/DynamicTable";
import usePersonsTable from "../hooks/usePersonsTable";
import { PersonDocument, PersonType } from "@lib/db/schemas/person/Person";
import PersonPopup from "../components/PersonPopup";
import PERSON_POPUP_MODE from "../contants/PersonPopupMode";
import PersonDeletePopup from "../components/PersonDeletePopup";
import handleDeletePerson from "@lib/controllers/person/handleDeletePerson";

export default function Persons({ personType }: { personType: PersonType }) {
  const { 
    persons, 
    pageSelected,
    personsFilter,
    setPersonsFilter,
    setPageSelected,
    pagesNumber,
    personsTableConfig,
    selectedPerson,
    personPopupMode, setPersonPopupMode,
    totalRecords
  } = usePersonsTable(personType)

  return (
    <>
      <PersonDeletePopup 
        isVisible={personPopupMode === PERSON_POPUP_MODE.DELETE}
        onChangeIsVisible={() => setPersonPopupMode(PERSON_POPUP_MODE.NONE)}
        documentsToDelete={selectedPerson as string[]}
        handleDeleteDocument={handleDeletePerson}
      />
      <PersonPopup 
        initialPerson={selectedPerson as PersonDocument}
        personType={personType} 
        isVisible={personPopupMode === PERSON_POPUP_MODE.CREATE || personPopupMode === PERSON_POPUP_MODE.EDIT} 
        onClose={() => setPersonPopupMode(PERSON_POPUP_MODE.NONE)} 
      />
      <div className="flex flex-row justify-between relative">
        <InputSearchTable 
          data={persons}
          filter={personsFilter}
          onChange={(e) => setPersonsFilter(e.target.value)}
          totalRecords={totalRecords.current}
        />
      </div>
      <DynamicTable
        config={personsTableConfig}
        initialData={persons} 
        pageSelected={pageSelected} 
        pagesNumber={pagesNumber}   
        setPageSelected={setPageSelected}   
      />
    </>
  )
}
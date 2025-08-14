import DEBOUNCE_TIME from "@ui/core/constants/DebounceTime"
import useDebounce from "@ui/core/hooks/useDebounce"
import { MappedObject } from "@ui/table/interfaces/Row"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import mapData from "@ui/table/util/mapData"
import Person, { PersonDocument, PersonType } from "@lib/db/schemas/person/Person"
import PERSON_TABLE_COLUMNS from "../contants/PersonTableColumns"
import { SessionContext } from "@ui/session/hooks/SessionProvider"
import { TableConfigProps } from "@ui/table/interfaces/Table"
import getClients from "@lib/services/client/getClients"
import getProviders from "@lib/services/providers/getProviders"
import PERSON_POPUP_MODE from "../contants/PersonPopupMode"
import getMongoFilter from "@lib/util/getMongoFilter"

const DEFAULT_PERSONS_FILTER: Partial<Person> = { isDeleted: false }

const getInitialPerson = (personType: PersonType): PersonDocument => {
  return {
    __v: 0,
    _id: { $oid: "" },
    isDeleted: false,
    id: "",
    name: "",
    lastname: "",
    type: personType,
    phone: [],
    debt: {
      maxValue: 0,
      time: 0
    }
  }
}

export default function usePersonsTable(personType: PersonType) {
  const { user } = useContext(SessionContext)
  const [persons, setPersons] = useState<Map<string, MappedObject> | null>(null)
  const [pageSelected, setPageSelected] = useState<number>(1)
  const pagesNumber = useRef<number>(1)
  const totalRecords = useRef<number>(0)
  const [selectedPerson, setSelectedPerson] = useState<PersonDocument | string[]>(getInitialPerson(personType))
  const [personPopupMode, setPersonPopupMode] = useState(PERSON_POPUP_MODE.NONE)
  
  const [personsFilter, setPersonsFilter] = useState<string>("")
  const debouncedPersonsFilter = useDebounce(personsFilter, DEBOUNCE_TIME)

  const fetchPersons = useCallback(async () => {
    if (personPopupMode !== PERSON_POPUP_MODE.NONE) return
    let result;
    const getPersons = personType === PersonType.CLIENT ? getClients : getProviders
    result = await getPersons(
      debouncedPersonsFilter 
        ? getMongoFilter(
            debouncedPersonsFilter, 
            ["id", "name", "lastname", "phone"], 
            DEFAULT_PERSONS_FILTER
          ) 
        : DEFAULT_PERSONS_FILTER, 
      pageSelected
    )
    pagesNumber.current = result.pages_number
    totalRecords.current = result.total_records
    setPersons(mapData(result.data)) 
  }, [pageSelected, debouncedPersonsFilter, personType, personPopupMode])

  useEffect(() => { fetchPersons() }, [fetchPersons])

  const userColumn = PERSON_TABLE_COLUMNS.find((expenseColumn) => expenseColumn.tag === 'user')
  if (userColumn) {
    userColumn.defaultValue = {
      name: user.name,
      lastname: user.lastname,
      userId: user.id
    }
  }

  const personsTableConfig: TableConfigProps = {
    modifiers: {
      onAddRow: () => {
        const newPerson = getInitialPerson(personType);
        setSelectedPerson(newPerson);
        setPersonPopupMode(PERSON_POPUP_MODE.CREATE);
      },
      onEditRow: async (data: any) => {
        setSelectedPerson(data as PersonDocument);
        setPersonPopupMode(PERSON_POPUP_MODE.EDIT);
      },
      onDeleteRow: async (ids: string[]) => {
        if (ids.length === 0) return
        setSelectedPerson(ids)
        setPersonPopupMode(PERSON_POPUP_MODE.DELETE);
      }
    },
    header: {
      columns: PERSON_TABLE_COLUMNS,
      picker: true,
      options: { onEdit: true }
    }
  }

  return {
    persons, setPersons,
    pageSelected, setPageSelected,
    pagesNumber,
    personsFilter, setPersonsFilter,
    debouncedPersonsFilter,
    personsTableConfig,
    totalRecords,
    personPopupMode, setPersonPopupMode,
    selectedPerson,
    setSelectedPerson
  }
}

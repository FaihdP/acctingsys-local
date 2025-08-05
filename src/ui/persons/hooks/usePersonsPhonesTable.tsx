import getPersonPhones from "@lib/services/person/getPersonPhones"
import { MappedObject } from "@ui/table/interfaces/Row"
import { ColumType, TableConfigProps } from "@ui/table/interfaces/Table"
import mapData from "@ui/table/util/mapData"
import { useEffect, useRef, useState } from "react"

export default function usePersonsPhonesTable(personId: string) {
  const [phones, setPhones] = useState<Map<string, MappedObject> | null>(null)
  const pagesNumber = useRef(1)
  const [pageSelected, setPageSelected] = useState<number>(1)

  useEffect(() => {
    const fetchPhones = async () => {
      const result = await getPersonPhones(personId)
      setPhones(mapData(result.data))
    }
    fetchPhones()
  }, [personId])
  
  const tablePhonesTableConfig: TableConfigProps = {
    actions: {
      onAdd: async (data) => {},
      onEdit: async (id, data) => {},
    },
    header: {
      picker: true,
      options: {
        onEdit: true
      },
      columns: [
        {
          type: ColumType.TEXT,
          label: "Telefono",
          tag: "phone",
        }
      ]
    },
  }

  return {
    pagesNumber,
    phones,
    setPhones,
    pageSelected,
    setPageSelected,
    tablePhonesTableConfig
  }
}